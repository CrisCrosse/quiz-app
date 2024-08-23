import "./AnswerTimer.scss";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
function AnswerTimer ( {duration, onTimeUp} ) {

    const [counter, setCounter] = useState(0);
    const [progressLoaded, setProgressLoaded] = useState(0);

    const intervalRef = useRef()

    // useeffects are called after every render
    useEffect(() => {

        // ref is set to an interval object which updates counter every second
        intervalRef.current = setInterval(
            () => { setCounter( (count) => count + 0.1) }
            , 100);
        // clear interval in cleanup function of useEffect, executed when element using useEffect is removed/unmounted
        // in this case when progress loaded is full?
        return () => {
            clearInterval(intervalRef.current);
        }

    }, []);

    useEffect(() => {
        setProgressLoaded(100 * (counter / duration))

        if(counter >= duration){
            clearInterval(intervalRef.current);

            // setTimeout(() => { onTimeUp() }, 1000);
             onTimeUp();
            // it was skipping a question when the nextclick function was called a second after the clearing of the interval
            // because the user clicks the next button, and then the set timeout callback is executed to increment the question again

            // without the setTimeout function it appears to skip to the next question early, the time bar only ever gets to 80
            // as you increase the transition duration in css it decreases the fullness of the bar before skipping
            // thats why the guy reduced the increment of the counter to 0.1 s

            // when the transition duration and the counter increment are the same the bar is full when the next question is displayed
            // why?

        }

    }, [counter]);
    return (
     <div className='answer-timer-container'>
        <div
            style={{
                width: `${progressLoaded}%`,
                backgroundColor: `${ 
                    progressLoaded < 40 ? 'lightgreen' 
                    : progressLoaded < 70 ? 'orange' 
                    : 'red'}`
            }}
            className='progress'></div>
    </div>
    )
}

export default AnswerTimer;

AnswerTimer.propTypes = {duration: PropTypes.number.isRequired}
AnswerTimer.propTypes = {onTimeUp: PropTypes.func.isRequired}
