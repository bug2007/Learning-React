export default function RSCDemo() {
  console.log('RSCDemo rendered');  // will not show up on browser console but on terminal. msgs that show up on terminal are printed by the server. in next.js project setup like this, all react components are server components by default
  return (
    <div className='rsc'>
      <h2>A React Server Component</h2>
      <p>
        Will <strong>ONLY</strong> be rendered on the server or at build time.
      </p>
      <p>
        <strong>NEVER</strong> on the client-side!
      </p>
    </div>
  );
}
