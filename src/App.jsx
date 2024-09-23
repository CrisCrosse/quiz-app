import Quiz from "./components/Quiz/Quiz.jsx";
import Homepage from "./components/Homepage/Homepage.jsx";
import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import fireUp from "./configuration.jsx";

function App() {
  const [questions, setQuestions] = useState([]);
  const [data, setData] = useState([]);
  const [isOnHomepage, setIsOnHomepage] = useState(true);
  const [hasQuestions, setHasQuestions] = useState(false);

  useEffect(() => {
    getQuestions().then(r => setHasQuestions(true) )
  }, []);

  const getQuestions = async() => {
    // if this is implemented as the actual quiz club thing --> how to get images?, via public url could be relatively easy
    // but large overhead to add an image publicly each time
    // would have to set up a server to host images and an api to get them?
    // or insert manually into source code

    try{
      const response = await fetch('https://644982a3e7eb3378ca4ba471.mockapi.io/questions');
      const questionResponse = await response.json();
      setQuestions(questionResponse);
      console.log(questionResponse)
    } catch(error){
      console.log(error)
    }
  }
  // the problem is somethign to do with the ternary and isOnHomePage state
  // questions is not getting time to be set before the component is rendered
  // this persists when going back to only rendering the quiz as wwell
  // return
  // return <Quiz questions={questions} />
  // return (
  //   isOnHomepage ? (<Homepage />)
  //       :
  //       (<Quiz questions={questions} />)
  // );
  const OnStartQuizClick = () => {
    setIsOnHomepage(false);
  }
  return (
      isOnHomepage ? (
        <Homepage OnStartQuizClick={OnStartQuizClick} />
      ) :
          ( hasQuestions && <Quiz questions={questions} />)
  );

}

export default App

