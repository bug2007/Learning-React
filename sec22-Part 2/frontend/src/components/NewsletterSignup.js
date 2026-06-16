import { useFetcher } from 'react-router-dom';
import classes from './NewsletterSignup.module.css';
import { useEffect } from 'react';

function NewsletterSignup() {
  const fetcher = useFetcher(); // use useFetcher() when u wanna trigger an action or loader but dont want a route transition (navigation to the page to which the loader or action belongs) while doing so. adding the action='/any-path' attribute to the <Form> wud initialize a route transition by default
  const { data, state } = fetcher;  // also can return data from the loader or action that was triggered. can return state to check if the loader or action is done executing

  useEffect(() => {
    if (state === 'idle' && data && data.message) {
      window.alert(data.message)
    }
  }, [data, state])

  return (
    // will trigger the action defined at /newsletter route without a route transition due to using fetcher. otherwise, action='/any-path' causes a route transition to that path by default 
    <fetcher.Form method="post" action='/newsletter' className={classes.newsletter}> 
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
