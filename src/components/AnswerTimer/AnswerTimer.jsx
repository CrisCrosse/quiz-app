import "./AnswerTimer.scss";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
function AnswerTimer ( {duration, onTimeUp} ) {

    const [counter, setCounter] = useState(0);
    const [progressLoaded, setProgressLoaded] = useState(0);

    const intervalRef = useRef()

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCounter((cur) => cur + 1)
        }, 1000);
        return () => {
            clearInterval(intervalRef.current);
        }

    }, []);

    useEffect(() => {
        setProgressLoaded(100 * (counter / duration))

        if(counter == duration){
            clearInterval(intervalRef.current);

            setTimeout(() => {
                onTimeUp();
            }, 1000)
        }

    }, [counter]);
    return (
     <div className='answer-timer-container'>
        <div className='progress'> {counter} </div>
    </div>
    )
}

export default AnswerTimer;

AnswerTimer.propTypes = {duration: PropTypes.number.isRequired}
AnswerTimer.propTypes = {onTimeUp: PropTypes.func.isRequired}
