import Quiz from "./components/Quiz/Quiz.jsx";
import {jsQuizz} from "./Questions.js";

function App() {

  return <Quiz questions={jsQuizz.questions} />;
}

export default App

