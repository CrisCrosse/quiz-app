import {useState} from 'react';
import PropTypes from 'prop-types';
import {resultInitialState} from '../../Questions.js';
// feels odd to need to import this from questions.js when it is just a set of counters started at 0
import './Quiz.scss';
import AnswerTimer from "../AnswerTimer/AnswerTimer";

const Quiz = ( {questions: questions} ) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [answerIndex, setAnswerIndex] = useState(null)
    const [answer, setAnswer] = useState(null)
    const [result, setResult] = useState(resultInitialState)
    const [isOnResultPage, setIsOnResultPage] = useState(false)
    const [showAnswerTimer, setShowAnswerTimer] = useState(true)

    const {question, choices, correctAnswer } = questions[currentQuestionIndex];

    const onAnswerClick = (answer, index) => {
        setAnswerIndex(index);
        if(answer == correctAnswer) {
            setAnswer(true)
        } else{
            setAnswer(false)
        }
    }

    const onNextClick = (finalAnswer) => {
        setAnswerIndex(null);
        setShowAnswerTimer(false);
        setResult((prev) =>
            finalAnswer ? {
                ...prev,
                score: prev.score + 1,
                correctAnswers: prev.correctAnswers + 1,
            }
            : {
                ...prev,
                wrongAnswers: prev.wrongAnswers + 1,
            }
        )

        if(currentQuestionIndex !== questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1)
        } else {
            setCurrentQuestionIndex(0);
            setIsOnResultPage(true);
        }
        setTimeout(() => {
            setShowAnswerTimer(true);
        })

    }

    const onTryAgainClick = () => {
        setResult(resultInitialState);
        setIsOnResultPage(false);
    };

    const handleTimeUp = () => {
        setAnswer(false);
        onNextClick(false);
    }

    return (
        <div className={'quiz-container'}>
            {!isOnResultPage ? (<>
                { showAnswerTimer && <AnswerTimer duration={5} onTimeUp={handleTimeUp} /> }
                <span className='active-question-no'> {currentQuestionIndex + 1}</span>
                <span className='total-questions'>/{questions.length} </span>
                <h2> {question} </h2>
                <ul>
                    {
                        choices.map( (choice, index) => (
                                <li
                                    onClick={() => onAnswerClick(choice, index) }
                                    key={choice}
                                    className={answerIndex === index ? 'selected-answer' : null}
                                >
                                    {choice}
                                </li>
                            )
                        )
                    }
                </ul>
                <div className={'footer'}>
                    <button onClick={() => onNextClick(answer)} disabled={answerIndex === null}>
                        {currentQuestionIndex === questions.length -1 ? 'Finish' : 'Next'}
                    </button>
                </div>
            </>) : <div className={'result'}>
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
            </div>}

        </div>
    );
}

export default Quiz;
Quiz.propTypes = {questions: PropTypes.array.isRequired }