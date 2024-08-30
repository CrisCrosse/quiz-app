import "./Result.scss"
import PropTypes from "prop-types";
import {useState, useEffect } from "react";


const Result = ({noOfQuestions, result, onTryAgainClick}) => {
    const [name, setName] = useState('');
    const [highScores, setHighScores] = useState([]);
    const [showScores, setShowScores] = useState(false);

    useEffect(() => {
        setHighScores(JSON.parse(localStorage.getItem('highScores')) || [])
    }, [])

    const handleSave = () => {
        const score = {
            name,
            score: result.score
        };

        const newHighScores = [...highScores, score].sort((a, b) => b.score - a.score);
        setHighScores(newHighScores);
        setShowScores(true);
        localStorage.setItem('highScores', JSON.stringify(newHighScores))
    }

    const handleTryAgain = () => {
        setShowScores(false);
        setHighScores([]);
        onTryAgainClick();

    }

    return (
        (<div className={'result'}>
            <h3>Result</h3>
            <p>
                Total Questions: <span>{noOfQuestions}</span>
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
            <button onClick={handleTryAgain}> Try Again </button>
            { !showScores ? <>
                <h3>
                    Enter your name below <br/> to save your score
                </h3>
                <input
                    value={name}
                    onChange={(evt) => setName(evt.target.value)}
                    type='text'
                    placeholder='Type your name here'
                />
                <button onClick={handleSave}> Save</button>
            </>
            : <>
                <table>
                    <thead>
                        <tr>
                            <th> Ranking </th>
                            <th> Name </th>
                            <th> Score </th>
                        </tr>
                    </thead>
                    <tbody>
                        {highScores.map((highScore, index) => {
                            return (
                                <tr key={index}>
                                    <td> {index+1} </td>
                                    <td> {highScore.name} </td>
                                    <td> {highScore.score} </td>
                                </tr>)
                            })
                        }

                    </tbody>
                </table>
            </>}

        </div>)
    );
}

export default Result;
Result.propTypes = {result: PropTypes.object.isRequired, noOfQuestions: PropTypes.number.isRequired, onTryAgainClick: PropTypes.func.isRequired }