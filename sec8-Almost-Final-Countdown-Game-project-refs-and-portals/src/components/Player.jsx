import { useState, useRef } from 'react';

export default function Player() {
  const playerName = useRef(); // it's like a special variable. playerName will always be a js object, here. the input element and the playeName are not connected, so u can access the input element by using playerName

  const [enteredPlayerName, setEnteredPlayerName] = useState('');

  function handleClick() {
    setEnteredPlayerName(playerName.current.value); // playerName.current is directly accessing the input element even without passing any event or anything to the button's handleClick() func. 
    playerName.current.value='';
  }

  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName ? enteredPlayerName : 'unknown entity'}</h2>
      <p>
        {/* before, we would have done event.target.value inside handleClick(event) func to access the input element's value:
          <input ref={playerName} onChange={handleClick} type="text" />
        */}
        <input ref={playerName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
