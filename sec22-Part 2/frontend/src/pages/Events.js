// import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom'; // to get access to the closest loader data

import EventsList from '../components/EventsList';

function EventsPage() {
  // const [isLoading, setIsLoading] = useState(false);
  // const [fetchedEvents, setFetchedEvents] = useState();
  // const [error, setError] = useState();

  // useEffect(() => {
  //   async function fetchEvents() {
  //     setIsLoading(true);
  //     const response = await fetch('http://localhost:8080/events');

  //     if (!response.ok) {
  //       setError('Fetching events failed.');
  //     } else {
  //       const resData = await response.json();
  //       setFetchedEvents(resData.events);
  //     }
  //     setIsLoading(false);
  //   }

  //   fetchEvents();
  // }, []);

  const data = useLoaderData();

  // if (data.isError) {
  //   return <p>{data.message}</p>
  // }

  const events = data.events;

  return (
    <>
      {/* <div style={{ textAlign: 'center' }}>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </div> */}
      {/* {!isLoading && fetchedEvents && <EventsList events={fetchedEvents} />} */}
      <EventsList events={events} />
    </>
  );
}

export default EventsPage;

export async function loader() {  // cant use react hooks inside loader funcs
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // return {isError: true, message: 'Could not fetch events.'}
    throw new Response(JSON.stringify({message: 'Could not fetch events.'}), {status: 500}) // throwing will allow react router to simply render the closest errorElement
  } else {
    return response;
  }
}