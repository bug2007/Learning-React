import { useState, useCallback } from "react";

import QUESTIONS from '../questions.js';
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setUserAnswers(prevUserAnswers => {
            return [...prevUserAnswers, selectedAnswer]
        })
    }, [])

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    if (quizIsComplete) {
        return (
            <Summary userAnswers={userAnswers} />
        )
    }

    return (
        <div id="quiz">
            {/* setting unique key (a built-in prop) so that the Question is unmounted and remounted from the DOM everytime and as a result, those timer and interval in the QuestionTimer component will cleanup and reexecute the effect funcs, thus setting a new timer and new interval everytime. that way every new question will have a new timer and new interval set again  */}
            <Question key={activeQuestionIndex} index={activeQuestionIndex} onSkipAnswer={handleSkipAnswer} onSelectAnswer={handleSelectAnswer} />
        </div>
    )
}