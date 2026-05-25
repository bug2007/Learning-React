import { use, useActionState, useOptimistic } from 'react';  // useOptimistic helps us with optimistic updating. it is meant to be used in conjunction with form actions

import { OpinionsContext } from '../store/opinions-context';

export function Opinion({ opinion: { id, title, body, userName, votes } }) {
  const { upvoteOpinion, downvoteOpinion } = use(OpinionsContext)

  const [optimisticVotes, setVotesOptimistically] = useOptimistic(votes, (prevVotes, mode) =>   // votes is a state that is returned in optimisticVotes. setVotesOptimistically is a func u can call which is defined inside the useOptimistic(): the 2nd parameter. the func shud be called inside of a form action. optimisticVotes is a temporary state thats only shown on the UI whilst the form (that invoked this optimistic func) is being submitted. then it will be thrown away and the UI will be updated with the value its supposed to after the form submission is complete. component will re-execute just as it does with useState. if there's suppose a backend error, then the value will be updated temporarily with the new temporary optimisticVotes state before rolling back to the old value  
    mode === 'up' ? prevVotes + 1 : prevVotes - 1
  )

  async function upvoteAction() {
    setVotesOptimistically('up');
    await upvoteOpinion(id);
    // once the form action completes, useOptimistic will get rid of the optimisticVotes state and instead apply the regular UI state
  }

  async function downvoteAction() {
    setVotesOptimistically('down');
    await downvoteOpinion(id);
    // once the form action completes, useOptimistic will get rid of the optimisticVotes state and instead apply the regular UI state
  }

  const [upvoteFormState, upvoteFormAction, upvotePending] = useActionState(upvoteAction);
  const [downvoteFormState, downvoteFormAction, downvotePending] = useActionState(downvoteAction);

  return (
    <article>
      <header>
        <h3>{title}</h3>
        <p>Shared by {userName}</p>
      </header>
      <p>{body}</p>
      <form className="votes">
        <button formAction={upvoteFormAction} disabled={upvotePending || downvotePending}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m16 12-4-4-4 4" />
            <path d="M12 16V8" />
          </svg>
        </button>

        <span>{optimisticVotes}</span>

        <button formAction={downvoteFormAction} disabled={upvotePending || downvotePending}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M12 8v8" />
            <path d="m8 12 4 4 4-4" />
          </svg>
        </button>
      </form>
    </article>
  );
}
