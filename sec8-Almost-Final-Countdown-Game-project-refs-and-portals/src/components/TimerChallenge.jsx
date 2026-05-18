import { useState, useRef } from "react";

import ResultModal from "./ResultModal.jsx";

export default function TimerChallenge({ title, targetTime }) {
    const timer = useRef();  // had we used just a normal variable (let timer;), it wud have re-executed with the component and thus been reset. but refs, like states, are not re-executed along with the component.
    const dialog = useRef();

    const [timeRemaining, setTimeRemaining] = useState(targetTime*1000);

    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    if (timeRemaining <= 0) {
        clearInterval(timer.current);
        dialog.current.open();  // dialog.current holds the object that's returned by the useImperativeHandle in ResultModal.jsx
    }

    function handleReset() {
        setTimeRemaining(targetTime * 1000);
    }

    function handleStart() {
        timer.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);
        }, 10);
    }

    function handleStop() {
        dialog.current.open();  // dialog.current holds the object that's returned by the useImperativeHandle in ResultModal.jsx
        clearInterval(timer.current);
    }

    return (
        <>
        {/* ResultModal is set to dislay: none by default in the CSS file */}
        <ResultModal ref={dialog} targetTime={targetTime} remainingTime={timeRemaining} onReset={handleReset} /> 
        <section className="challenge">
            <h2>{title}</h2>
            <p className="challenge-time">
                {targetTime} second{targetTime > 1 ? 's' : ''}
            </p>
            <p>
                <button onClick={timerIsActive ? handleStop : handleStart}>{timerIsActive ? 'Stop' : 'Start'} Challenge</button>
            </p>
            <p className={timerIsActive ? 'active' : undefined}>{timerIsActive ? 'Time is running...' : 'Timer inactive'}</p>
        </section>
         </>
    )
}