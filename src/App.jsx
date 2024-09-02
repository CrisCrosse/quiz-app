import Quiz from "./components/Quiz/Quiz.jsx";
import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import fireUp from "./configuration.jsx";

function App() {
  const [questions, setQuestions] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    getQuestions()

    const database = getDatabase(fireUp, 'https://puzzle-club-db-default-rtdb.europe-west1.firebasedatabase.app/');
    const collectionRef = ref(database, "Users")

    const fetchData = () => {
      onValue(collectionRef, (snapshot) => {
        const dataItem = snapshot.val();

        if (dataItem){
          const displayItem = Object.values(dataItem);
          setData(displayItem);
        }
      });
    }
    fetchData();
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
    } catch(error){
      console.log(error)
    }
  }
  return (
      // <div>
      //   <h1>Data from database:</h1>
      //   <p> {data} </p>
      //   <ul>
      //     {data.map((item, index) => (
      //         <li key={index}>{item} {index}</li>
      //     ))}
      //   </ul>
      // </div>
     questions.length && <Quiz questions={questions} />);
}

export default App

