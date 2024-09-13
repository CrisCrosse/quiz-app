import quizOptions from "../../Constants.js";
import { useState } from "react";
import './Homepage.scss';

const Homepage = () => {
    const [selectedQuizIndex, setSelectedQuizIndex] = useState(null);
    const [isQuizSelected, setIsQuizSelected] = useState(false);
    const quizOptionsNames = Object.keys(quizOptions);


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
                <li> Quiz1 </li>
                <li> Quiz2 </li>
            </ol>
        </div>
    );
}

export default Homepage;