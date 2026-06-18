import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query'; // using useMutation, reqs are only sent when u want to send them, for example, from inside the handleSubmit() func (unlike useQuery that sends the req as soon as the component renders). use it when u need to send reqs to change data, e.g, post/patch reqs

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { createNewEvent } from '../../util/http.js'
import ErrorBlock from '../UI/ErrorBlock.jsx';
import { queryClient } from '../../util/http.js';

export default function NewEvent() {
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewEvent, // useMutation will not send this req right away (unlike useQuery). instead u can the func 'mutate' to send the req whenever u want
    onSuccess: () => {  // a func that will be executed once the mutation succeeds. will execute only if the mutation succeeds
      queryClient.invalidateQueries({queryKey: ['events']}); // tells the react query that the data fetched by certain queries is outdated now (since we added a new event by using useMutation) that it should be marked as stale and an immediate refetch shud be triggered if the query belongs to a component that's currently visible on the screen (because background refetch happens when u go away and come back. it wont happen if the component e.g the events component, is still visible on the screen). all the queries that involve the queryKey 'events' (even the one in FindEventSection.jsx if u didnt say exact: true) will be invalidated
      navigate('/events')   
    }
  })

  function handleSubmit(formData) {
    mutate({event: formData}) // backend wants to receive data in this format
  }

  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && 'Submitting...'}
        {!isPending && (
          <>
          <Link to="../" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button">
            Create
          </button>
        </>
        )}
      </EventForm>
      {isError && <ErrorBlock title='Failed to create event' message={error.info?.message || 'Failed to create event. Please check your inputs and try again later.'}/>}
    </Modal>
  );
}  
