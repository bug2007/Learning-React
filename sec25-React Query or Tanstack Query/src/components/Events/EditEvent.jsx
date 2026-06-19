import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import LoadingIndicator from '../UI/LoadingIndicator.jsx'
import { fetchEvent, updateEvent, queryClient } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  const navigate = useNavigate();
  const params = useParams();

  const {data, isPending, isError, error} = useQuery({
    queryKey: ['events', params.id],
    queryFn: ({signal}) => fetchEvent({signal, id: params.id}) 
  })

  const {mutate} = useMutation({
    mutationFn: updateEvent,
    onMutate: async (data) => {  //data is the same input received by mutate(). this func will be executed right when u call mutate() (so before mutate() even finishes executing or before we get back a backend reponse)
      const newEvent = data.event;

      await queryClient.cancelQueries({queryKey: ['events', params.id]}) // a common thing to do before optimistic updating. cancelling ongoing queries (not mutations) for that queryKey
      const previousEvent = queryClient.getQueryData(['events', params.id]) // storing the old data of the event
      queryClient.setQueryData(['events', params.id], newEvent)  // this is optimistic updating. will modify the data on the UI without getting back the response from backend. had we used invalidateQueries to refetch data and modify the data on the UI, we wud have to wait for the mutate() func to finish executing (updating the data in the backend) first. without waiting for it to finish, we are passing the newly edited data (newEvent) so that the UI is instantly updated with this new data

      return {previousEvent}  // will be the context in onError below
    },
    onError: (error, data, context) => {   // data is the same input received by mutate(). onError() executed if mutationFn fails
      queryClient.setQueryData(['events', params.id], context.previousEvent)  // roll back to old data if updating with new data fails
    },
    onSettled: () => {  // will be called after the mutation finishes executing, no matter if it succeeds or fails
      queryClient.invalidateQueries(['events', params.id]) // just making sure we have the same data on frontend as we have on backend. invalidating makes sure data is refetched behind the scenes
    }
  })

  function handleSubmit(formData) {
    mutate({id: params.id, event: formData}),
    navigate('../')
  }
  

  function handleClose() {
    navigate('../');
  }

  let content;

  if (isPending) {
    content = (
      <div className='center'>
        <LoadingIndicator />
      </div>
    )
  }

  if (isError) {
    content = (
      <>
        <ErrorBlock title='Failed to load event' message={error.info?.message || 'Failed to load event. Please check your inputs and try again later.'}/>
        <div className='form-actions'>
          <Link to='../' className='button'>
            Okay
          </Link>
        </div>
      </>
    )
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    )
  }

  return (
    <Modal onClose={handleClose}>
      {content}
    </Modal>
  );
}
