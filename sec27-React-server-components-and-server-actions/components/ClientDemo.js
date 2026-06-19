'use client';  // turns this component into a client side component. client side component is executed on both the server and the client side. why we might want to turn a server component into client component? because we might wanna use features like useState which can only be in client components

export default function ClientDemo({ children }) {
  console.log('ClientDemo rendered');
  return (
    <div className='client-cmp'>
      <h2>A React Client Component</h2>
      <p>
        Will be rendered on the client <strong>AND</strong> the server.
      </p>
      {children}
    </div>
  );
} 
