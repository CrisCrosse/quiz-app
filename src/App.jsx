import Quiz from "./Quiz";
import {jsQuizz} from "./Questions.js";

function App() {

  return <Quiz questions={jsQuizz.questions} />;
}

export default App

