// import { useEffect, useState } from 'react';

// Tanstack query doesnt send http reqs on its own. u have to write the code that sends the actual http req. tanstack query then manages the data, erros, caching and much more. also, if u go away from the app, and return, the reqs, for example, a fetch req, is sent again behind the scenes so that in case the backend data has changed, the updated/latest data is presented to the user
import { useQuery } from '@tanstack/react-query'; 

import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';
import { fetchEvents } from '../../util/http.js';

export default function NewEventsSection() {
  // const [data, setData] = useState();
  // const [error, setError] = useState();
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   async function fetchEvents() {
  //     setIsLoading(true);
  //     const response = await fetch('http://localhost:3000/events');

  //     if (!response.ok) {
  //       const error = new Error('An error occurred while fetching the events');
  //       error.code = response.status;
  //       error.info = await response.json();
  //       throw error;
  //     }

  //     const { events } = await response.json();

  //     return events;
  //   } 

  //   fetchEvents()
  //     .then((events) => {
  //       setData(events);
  //     })
  //     .catch((error) => {
  //       setError(error);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, []);

  // any change to data, isPending or any other state will cause useQuery to reexecute the component
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events'], // has to be an arr of values. key is needed to be able to reuse the data later
    queryFn: fetchEvents, // has to be a func that returns a promise. the response data will be cached by tanstack query so that we can instantly reuse/present the data later but at the same time, the fetch req will be sent again behind the scenes to see if there's any updated data.
    staleTime: 5000, // after which time tanstack query will send such a behind the scenes req to fetch updated data if it found any data in ur cache 
    // gcTime: 30000 // how long the data and the cache will be kept for
  })

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock title="An error occurred" message={error.info?.message || 'Failed to fetch events.'} />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
