import {useState} from 'react';
import PropTypes from 'prop-types';
import {resultInitialState} from '../../Constants.js';
// feels odd to need to import this from questions.js when it is just a set of counters started at 0
import './Quiz.scss';
import AnswerTimer from "../AnswerTimer/AnswerTimer";

const Quiz = ( {questions: questions} ) => {
    // does passing in the questions here make sense as a prop? just import directly from Quiz component
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [SelectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
    const [isCorrectAnswer, setIsCorrectAnswer] = useState(null)
    const [result, setResult] = useState(resultInitialState)
    const [isOnResultPage, setIsOnResultPage] = useState(false)
    const [isAnswerTimerVisible, setIsAnswerTimerVisible] = useState(true)
    const [inputAnswer, setInputAnswer] = useState('')

    const {question, choices, correctAnswer, type } = questions[currentQuestionIndex];
    // questions is limited by to contain these 3 fields would this be applicable for an image quiz?
    // would probably want a whole different component? or extend this component

    const onAnswerClick = (clickedAnswer, clickedIndex) => {
        setSelectedAnswerIndex(clickedIndex);
        if(clickedAnswer == correctAnswer) {
            setIsCorrectAnswer(true)
        } else{
            setIsCorrectAnswer(false)
        }
    }

    const onNextClick = (isCorrectAnswerSelected) => {
        setSelectedAnswerIndex(null);
        setIsAnswerTimerVisible(false);
        setResult(
            (previousResult) => isCorrectAnswerSelected ? {
                score: previousResult.score + 1,
                correctAnswers: previousResult.correctAnswers + 1,
                wrongAnswers: previousResult.wrongAnswers }
            : {
                score: previousResult.score,
                correctAnswers: previousResult.correctAnswers,
                wrongAnswers: previousResult.wrongAnswers + 1 }
        )

        if(isLastQuestion()) {
            setIsOnResultPage(true);
            // this triggers rerender and hits the conditional so the quiz cquestions component is not dislayed
        } else {
            setCurrentQuestionIndex((previousQuestionIndex) => previousQuestionIndex + 1)
        }

        // this is called within setTimeout so that there is a delay between the first hiding of answer timer and this display
        setTimeout(() => { setIsAnswerTimerVisible(true) })
    }
    function isLastQuestion() {
        return (currentQuestionIndex == questions.length - 1)
    }

    const onTryAgainClick = () => {
        setCurrentQuestionIndex(0);
        setResult(resultInitialState);
        setIsOnResultPage(false);
    };

    const handleTimeUp = () => {
        onNextClick(false);
    };

    const getAnswerUI = () => {

        if(type == 'FIB') {
            return (<input value={inputAnswer} onChange={handleInputChange} type='text' placeholder='Type your answer here' />)
        }
        return (
            <ul>
            {
                choices.map((choice, index) => (
                        <li
                            onClick={() => onAnswerClick(choice, index)}
                            key={choice}
                            className={SelectedAnswerIndex === index ? 'selected-answer' : null}
                        >
                            {choice}
                        </li>
                    )
                )
            }
            </ul>
        )
    }

    const handleInputChange = (event) => {
        setInputAnswer(event.target.value);

        if(event.target.value == null || event.target.value == '')
            setSelectedAnswerIndex(null);
        else {
            setSelectedAnswerIndex(0);
        }


        if(event.target.value.toLowerCase() === correctAnswer.toLowerCase()) {
            setIsCorrectAnswer(true);
        } else {
            setIsCorrectAnswer(false);
        }
    }


    return (
        <div className={'quiz-container'}>
            {isOnResultPage ?
                (<div className={'result'}>
                    <h3>Result</h3>
                    <p>
                        Total Questions: <span>{questions.length}</span>
                    </p>
                    <p>
                        Total Score: <span>{result.score}</span>
                    </p>
                    <p>
                        Total Correct Answers: <span>{result.correctAnswers}</span>
                    </p>
                    <p>
                        Total Wrong Answers: <span>{result.wrongAnswers}</span>
                    </p>
                    <button onClick={onTryAgainClick}> Try Again </button>
                </div>)
            : 
                (<>
                    { isAnswerTimerVisible && <AnswerTimer duration={5} onTimeUp={handleTimeUp} /> }
                    <span className='active-question-no'> {currentQuestionIndex + 1}</span>
                    <span className='total-questions'>/{questions.length} </span>
                    <h2> {question} </h2>
                    {getAnswerUI()}
                    <div className={'footer'}>
                        <button onClick={() => onNextClick(isCorrectAnswer)} disabled={SelectedAnswerIndex === null}>
                            {isLastQuestion() ? 'Finish' : 'Next'}
                        </button>
                    </div>
                </>)
            } 

        </div>
    );
}

export default Quiz;
Quiz.propTypes = {questions: PropTypes.array.isRequired }