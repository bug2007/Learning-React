import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query'; // using useMutation, reqs are only sent when u want to send them, for example, from inside the handleSubmit() func (unlike useQuery that sends the req as soon as the component renders). use it when u need to send reqs to change data, e.g, post/patch reqs

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { createNewEvent } from '../../util/http.js'
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function NewEvent() {
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewEvent // useMutation will not send this req right away (unlike useQuery). instead u can the func 'mutate' to send the req whenever u want
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
