'use client';

import { useState, use } from "react";

export default function UsePromiseDemo({usersPromise}) {
  const users = use(usersPromise);   // use() hook can also be used like this, not just to access context. this will wait for the promise to resolve here so we can add Suspense around this component in the page.js. cant be used in every situation and in every React project setup tho 
  const [count, setCount] = useState(0)
  
  return (
    <div className='rsc'>
      <h2>RSC with Data Fetching</h2>
      <p>
        Uses <strong>async / await</strong> for data fetching.
      </p>
      <p>
        <button onClick={() => setCount((prevCount) => prevCount + 1)}>Increment</button>
        <span>{count}</span>
      </p>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.title})
          </li>
        ))}
      </ul>
    </div>
  );
}
