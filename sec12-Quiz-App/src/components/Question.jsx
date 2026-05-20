import QuestionTimer from "./QuestionTimer.jsx"
import Answers from "./Answers.jsx";

export default function Question({onSkipAnswer, questionText, answers, onSelectAnswer, selectedAnswer, answerState}) {
    return (
        <div id="question">
            {/* setting this unique key (a built-in prop) so that the QuestionTimer is unmounted and remounted from the DOM everytime and as a result, those timer and interval in the QuestionTimer component will cleanup and reexecute the effect funcs, thus setting a new timer and new interval everytime. that way every new question will have a new timer and new interval set again  */}
            <QuestionTimer timeout={10000} onTimeout={onSkipAnswer} />
            <h2>{questionText}</h2>
            <Answers answers={answers} selectedAnswer={selectedAnswer} answerState={answerState} onSelect={onSelectAnswer} />
        </div>
    )
}