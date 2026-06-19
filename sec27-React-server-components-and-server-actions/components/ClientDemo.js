'use client';
// import RSCDemo from "./RSCDemo";

  // turns this component into a client side component. client side component is executed on both the server and the client side. why we might want to turn a server component into client component? because we might wanna use features like useState which can only be in client components

export default function ClientDemo({ children }) {
  console.log('ClientDemo rendered');
  return (
    <div className='client-cmp'>
      <h2>A React Client Component</h2>
      <p>
        Will be rendered on the client <strong>AND</strong> the server.
      </p>
      {/* this RSC is automatically converted to a client component otherwise it wont work. but to force it to be an RSC, we can add the 'async' to it */}
      {/* <RSCDemo />  */}

      {/* but here RSC is inserted and remains a server component */}
      {children} 
    </div>
  );
} 

// Client component inside RSC will work
{/* 
  <h2>Im a RSC!</h2>
  <SomeClientComponent /> */}


// RSC inside ClientComponent wont work 
{/* 
  <h2>Im a ClientComponent!</h2>
  <SomeRSC /> */}

// but can use RSC inside ClientComponent as children
{/* <SomeClientComponent>
  <SomeRSC />
</SomeClientComponent>

then:

<h2>Im a ClientComponent!</h2>
{children} */}

