export async function fetchEvents(searchTerm) {
      let url = 'http://localhost:3000/events';
      if (searchTerm) {
        url += '?search=' + searchTerm;
      }
      
      const response = await fetch(url);

      if (!response.ok) {
        const error = new Error('An error occurred while fetching the events');
        error.code = response.status;
        error.info = await response.json();
        throw error; // make sure an error is thrown for an erroneous response so that u r able to use isError in useQuery() of tanstack query
      }

      const { events } = await response.json();

      return events;
    } 