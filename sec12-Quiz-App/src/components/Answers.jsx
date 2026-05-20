import { useRef } from "react";

export default function Answers({answers, selectedAnswer, answerState, onSelect}) {
    const shuffledAnswers = useRef();   // to manage the shuffledAnswers variable which will not change if the component function re-executes
    
    if (!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers];
        shuffledAnswers.current.sort(() => Math.random() - 0.5);
    }
    return (
    <ul id="answers">
        {shuffledAnswers.current.map(answer => {
        const isSelected = selectedAnswer === answer;
        let cssClass = '';

        if (answerState === 'answered' && isSelected) {
            cssClass = 'selected';
        }

        if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
            cssClass = answerState;
        }

        return (<li key={answer} className="answer">
            <button onClick={() => onSelect(answer)} className={cssClass}>{answer}</button>
        </li>)})
        } 
    </ul>
    )
}