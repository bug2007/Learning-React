import { useNavigate, Form, useNavigation, useActionData, redirect } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';  // checking if the action (Form submitting data - it will lead to a transition from one route to another) is still active

  function cancelHandler() {
    navigate('..');
  }

  return (
    // this will not send any request to the backend but instead to your action which will include all the form data
    <Form method={method} className={classes.form}> 
    {data && data.errors && <ul>
      {Object.values(data.errors).map(err => <li key={err}>{err}</li>)}
      </ul>}
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required defaultValue={event ? event.title : ''} />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={event ? event.image : ''} />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue={event ? event.date : ''} />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required defaultValue={event ? event.description : ''} />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Save'}</button>
      </div>
    </Form>
  );
}

export default EventForm;

export async function action({request, params}) {
  const method = request.method;
    const data = await request.formData();

    const eventData = {
        title: data.get('title'),
        image: data.get('image'),
        date: data.get('date'),
        description: data.get('description')
    }

    let url = 'http://localhost:8080/events';

    if(method === 'PATCH') {
      const eventId = params.eventId;
      url = 'http://localhost:8080/events/' + eventId;
    }

    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
    });

    if (response.status === 422) {  // in case of validation errors
        return response; // just like how we can return response in loader and then access that response inside component (via useLoaderData / useRouterLoaderData). to access response returned by action, use useActionData
    }

    if (!response.ok) {
        throw new Response(JSON.stringify({message: 'Could not save event.'}), {status: 500})
    }
    return redirect('/events'); // redirect the user after they submit the form
}