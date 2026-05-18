import { useState, useRef } from "react";

import ResultModal from "./ResultModal.jsx";

export default function TimerChallenge({ title, targetTime }) {
    const [timerStarted, setTimerStarted] = useState(false);
    const [timerExpired, setTimerExpired] = useState(false);

    const timer = useRef();  // had we used just a normal variable (let timer;), it wud have re-executed with the component and thus been reset. but refs, like states, are not re-executed along with the component.
    const dialog = useRef();

    function handleStart() {
        setTimerStarted(true);
        timer.current = setTimeout(() => {
            setTimerExpired(true);
            dialog.current.open();  // dialog.current holds the object that's returned by the useImperativeHandle in ResultModal.jsx
        }, targetTime * 1000);
    }

    function handleStop() {
        clearTimeout(timer.current);
    }

    return (
        <>
        <ResultModal ref={dialog} targetTime={targetTime} result="lost" />
        <section className="challenge">
            <h2>{title}</h2>
            <p className="challenge-time">
                {targetTime} second{targetTime > 1 ? 's' : ''}
            </p>
            <p>
                <button onClick={timerStarted ? handleStop : handleStart}>{timerStarted ? 'Stop' : 'Start'} Challenge</button>
            </p>
            <p className={timerStarted ? 'active' : undefined}>{timerStarted ? 'Time is running...' : 'Timer inactive'}</p>
        </section>
         </>
    )
}