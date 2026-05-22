import { useState, useEffect } from 'react';

import Places from './Places.jsx';
import ErrorPage from './Error.jsx'

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false)
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState()

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true)
      
      try {
        const response = await fetch('http://localhost:3000/places')
        const resData = await response.json()

        // handling HTTP errors
        if (!response.ok) {  // backend cud be sending an error response back if something goes wrong there
          throw new Error('Failed to fetch places')
        }  

        setAvailablePlaces(resData.places)

      } catch (error) {
        setError({message: error.message || 'Could not fetch places, please try again'})
      }

      setIsFetching(false)
    }

    fetchPlaces()
  }, [])

  if (error) {
    return <ErrorPage title="An error occurred!" message={error.message} />
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
