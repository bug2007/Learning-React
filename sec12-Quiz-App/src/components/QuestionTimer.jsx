import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeout, mode }) {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        const timer = setTimeout(onTimeout, timeout);
        return() => {clearTimeout(timer)} // so that when the game's over and the QuestionTimer component is showing no more, we want to clean up the timer anyway
    }, [timeout, onTimeout]) // making sure that if one of these dependencies change, the effect func will re-execute

    useEffect(() => {  // the effect func (setInterval) will execute only once after the component executues for the first time. when remainingTime changes, sure the component re-executes but the setInterval doesn't go off again (neither does the setTimeOut as we put it under useEffect too), so multiple setIntervals are avoided
        const interval = setInterval(() => {
            setRemainingTime((prevRemainingTime) => 
                prevRemainingTime - 100)
        }, 100)

        return () => {clearInterval(interval)}  // this cleanup func will run right before the 2nd setInterval goes off or right before this component dismounts. but here, we're using it to cleanup the interval before another setInterval goes off due to React's strictmode executing a component twice
    }, []);

    return (
        <progress id="question-time" max={timeout} value={remainingTime} className={mode} />
    )
}