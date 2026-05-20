import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeout }) {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        setTimeout(onTimeout, timeout);
    }, [timeout, onTimeout]) // making sure that if one of these dependencies change, the effect func will re-execute

    useEffect(() => {  // the effect func (setInterval) will execute only once after the component executues for the first time. when remainingTime changes, sure the component re-executes but the setInterval doesn't go off again (neither does the setTimeOut as we put it under useEffect too), so multiple setIntervals are avoided
        setInterval(() => {
            setRemainingTime((prevRemainingTime) => 
                prevRemainingTime - 100)
        }, 100)
    }, []);

    return (
        <progress id="question-time" max={timeout} value={remainingTime} />
    )
}