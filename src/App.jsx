import Quiz from "./components/Quiz/Quiz.jsx";
import {jsQuiz} from "./Constants.js";
import { useState, useEffect } from "react";

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQuestions()
  }, []);

  const getQuestions = async() => {
    // if this is implemented as the actual quiz club thing --> how to get images?, via public url could be relatively easy
    // but large overhead to add an image publicly each time
    // would have to set up a server to host images and an api to get them?

    try{
      const response = await fetch('https://644982a3e7eb3378ca4ba471.mockapi.io/questions');
      const questionResponse = await response.json();
      setQuestions(questionResponse);
    } catch(error){
      console.log(error)
    }
  }

  return questions.length && <Quiz questions={questions} />;
}

export default App

