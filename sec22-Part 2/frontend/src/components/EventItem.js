import classes from './EventItem.module.css';
import { Link, useSubmit } from 'react-router-dom'; // useSubmit to submit data programmitcally and trigger action

function EventItem({ event }) {
  const submit = useSubmit(); // gives us a submit func

  function startDeleteHandler() {
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      submit(null, {method: 'delete'})  // 1st parameter: data we want to submit. 2nd parameter: method (and action if the action is defined on a different route). submitting with Form or with useSubmit triggers actions defined on routes
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
