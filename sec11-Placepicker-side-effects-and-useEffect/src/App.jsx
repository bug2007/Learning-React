import { useRef, useState, useEffect } from 'react';   // cant use react hooks in nested funcs, if else blocks

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc.js';

// it doesnt take time to finish unlike the navigator code. no need to use useEffect either
const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
const storedPlaces = storedIds.map((id) => 
AVAILABLE_PLACES.find((place) => place.id === id))

function App() {
  const selectedPlace = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);
  const [ availablePlaces, setAvailablePlaces ] = useState([]);

  // now this func inside useEffect will be executed once only after the App component execution. the empty array given is a dependency. if the dependency doesnt change, the useEffect wont be re-executed when the App component re-executes.
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => { // to get the current loc of the user of the website. they will be asked for permission. arrow func will be called after fetching the loc
      const sortedPlaces = sortPlacesByDistance(AVAILABLE_PLACES, position.coords.latitude, position.coords.longitude)

      setAvailablePlaces(sortedPlaces);
    });  
  }, []);

  // this code is a sideEffect that does not directly or instantly impact the returned JSX code or the re-rendering of the App component or does not need to be rendered with the App component. app component will be rendered before this func is even finished. this wud also cause an infinite loop. so use useEffect to handle side effects. not all sideEffects need useEffect tho. useEffect only runs once after the first execution of the component.
  // navigator.geolocation.getCurrentPosition((position) => { // to get the current loc of the user of the website. they will be asked for permission. arrow func will be called after fetching the loc
  //   const sortedPlaces = sortPlacesByDistance(AVAILABLE_PLACES, position.coords.latitude, position.coords.longitude)

  //   setAvailablePlaces(sortedPlaces);
  // });  

  function handleStartRemovePlace(id) {
    setModalIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    // this is a sideEffect as well but we arent going to use useEffect for this
    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    if (storedIds.indexOf(id) === -1) {
      localStorage.setItem(
        'selectedPlaces', JSON.stringify([id, ...storedIds])
      );
    }
  }

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    setModalIsOpen(false);

    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    localStorage.setItem('selectedPlaces', JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current)))
  }

  return (
    <>
      <Modal open={modalIsOpen}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          fallbackText={'Sorting places by distance...'}  // will be shown during the time when we dont have the places={} yet because we're looking fo the user's location
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
