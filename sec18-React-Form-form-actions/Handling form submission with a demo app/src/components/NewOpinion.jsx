// import { useFormStatus } from 'react-dom';  // cant be used in the component that contains the form and the form action. must be used in some nested component used inside of the form

import { useActionState, use } from "react";

import { OpinionsContext } from "../store/opinions-context";
import Submit from './Submit.jsx';

export function NewOpinion() {
  const { addOpinion } = use(OpinionsContext)

  async function shareOpinionAction(prevState, formData) { // react will wait for the promise that is returned by this action func to resolve before it internally marks this form as submitted 
    const title = formData.get('title');
    const body = formData.get('body');
    const userName = formData.get('userName');

    let errors = [];

    if (title.trim().length < 5) {
      errors.push('Title must be at least five characters long.')
    }

    if (body.trim().length < 10 || body.trim().length > 300) {
      errors.push('Opinion must be between 10 and 300 characters long.')
    }

    if (!userName.trim()) {
      errors.push('Please provide your name.')
    }

    if (errors.length > 0) {
      return { errors, enteredValues: {title, body, userName}} // {errors: errors}
    }

    // submit to backend
    await addOpinion({ title, body, userName }) // want to wait till the data is submitted to the backend to return and have the form reset by default
    return { errors: null}
  }

  const [formState, formAction] = useActionState(shareOpinionAction, {errors: null})

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input type="text" id="userName" name="userName" defaultValue={formState.enteredValues?.userName} />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" defaultValue={formState.enteredValues?.title} />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body" rows={5} defaultValue={formState.enteredValues?.body}></textarea>
        </p>

        {formState.errors && 
          <ul className="errors">
            {formState.errors.map((error) => 
            <li key={error}>{error}</li>)}
          </ul>}

          <Submit />
      </form>
    </div>
  );
}
