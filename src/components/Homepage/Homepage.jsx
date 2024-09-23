import { quizOptions } from "../../Constants.js";

import { useState, useEffect } from "react";
import './Homepage.scss';

const Homepage = ({OnStartQuizClick}) => {
    const [selectedQuizIndex, setSelectedQuizIndex] = useState(null);
    const [isQuizSelected, setIsQuizSelected] = useState(false);
    const quizOptionsNames = Object.keys(quizOptions);
    // const [isOnHomepage, setIsOnHomepage] = useState(true);

    useEffect(() => {

        // console.log('quizOptions');
        // console.log(quizOptions);
        // console.log('quizOptionsNames');
        // console.log(quizOptionsNames);
    });

    const handleStartQuizClick = () => {
        OnStartQuizClick();
    }



    return (
        <div className={'homepage-container'}>

            <h1>Homepage</h1>
            <p> Pick your quiz from the options below </p>

            <ol>
                {quizOptionsNames.map((quiz, index) => (
                    <li
                        onClick={() => {
                            setSelectedQuizIndex(index);
                            setIsQuizSelected(true);
                        }}
                        key={quiz}
                        className={selectedQuizIndex === index ? 'selected-quiz' : null}
                    >
                        {quiz}
                    </li>
                ))

            }
            </ol>
            <button disabled={!isQuizSelected} onClick={handleStartQuizClick} > Start Quiz </button>
        </div>
    );
}

export default Homepage;