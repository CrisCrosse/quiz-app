import "./Result.scss"
import PropTypes from "prop-types";
import {useState, useEffect } from "react";
import {getDatabase, set, ref, child, get} from "firebase/database";
import fireUp from "../../configuration.jsx";


const Result = ({noOfQuestions, result, onTryAgainClick}) => {
    const [name, setName] = useState('');
    const [highScores, setHighScores] = useState([]);
    const [showScores, setShowScores] = useState(false);

    const database = getDatabase(fireUp, 'https://puzzle-club-db-default-rtdb.europe-west1.firebasedatabase.app/');
    // const collectionRef = ref(database, "Users")

    useEffect(() => {
        // replace this with set HighScores by reading from the firebase db
        setHighScores(JSON.parse(localStorage.getItem('highScores')) || [])
    }, [])

    const handleSave = () => {
        const score = {
            name,
            score: result.score
        };

        const newHighScores = [...highScores, score].sort((a, b) => b.score - a.score).slice(0, 5);
        setHighScores(newHighScores);
        setShowScores(true);
        localStorage.setItem('highScores', JSON.stringify(newHighScores))
        writeUserData(name, result.score)
        getScoresData();
    //     if we write and then display, will the db have updated by the time we read?


    }

    // does this need to be an anonymous function?
    function writeUserData(userName, score) {
        set(ref(database, 'Users/' + userName), {
            name: userName,
            score: score
        });
    }
    function getScoresData(){
        get(ref(database, `Users/`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    // const fetchData = () => {
    //     onValue(collectionRef, (snapshot) => {
    //         const dataItem = snapshot.val();
    //
    //         if (dataItem){
    //             const displayItem = Object.values(dataItem);
    //             setData(displayItem);
    //         }
    //     });
    // }
    // fetchData();

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