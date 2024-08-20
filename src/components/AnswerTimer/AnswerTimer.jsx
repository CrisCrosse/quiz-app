import "./AnswerTimer.scss";
import { useEffect, useState } from "react";
function AnswerTimer () {

    const [counter, setCounter] = useState(0);

    useEffect(() => {
        setInterval(() => {
            setCounter((cur) => cur + 1)
        }, 1000)

    }, []);
    return (
     <div className='answer-timer-container'>
        <div className='progress'> {counter} </div>
    </div>
    )
}

export default AnswerTimer;