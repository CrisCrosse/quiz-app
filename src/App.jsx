import Quiz from "./components/Quiz/Quiz.jsx";
import {jsQuiz} from "./Constants.js";

function App() {

  return <Quiz questions={jsQuiz.questions} />;
}

export default App

