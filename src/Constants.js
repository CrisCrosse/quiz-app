export const jsQuiz = {
    questions: [
        {
            question:
                "............ provide a way to pass data from one component to the other. \n Fill in the blank",
            choices: [],
            type: "FIB",
            correctAnswer: "Props",
        },
        {
            question:
                "Which of the following is used in React.js to increase performance?",
            choices: [
                "Virtual DOM",
                "Original DOM",
                "Both A and B",
                "None of the above",
            ],
            type: "MCQs",
            correctAnswer: "Virtual DOM",
        },
        {
            question: "What is ReactJS?",
            choices: [
                "Server-side framework",
                "User Interface framework",
                "both a and b",
                "None of the above",
            ],
            type: "MCQs",
            correctAnswer: "User Interface framework",
        },
        {
            question:
                "Identify the one which is used to pass data to components from outside",
            choices: ["Render with arguments", "setState", "PropTypes", "props"],
            type: "MCQs",
            correctAnswer: "props",
        },
        {
            question: "In which language is React.js written?",
            choices: ["Python", "Java", "C#", "JavaScript"],
            type: "MCQs",
            correctAnswer: "JavaScript",
        },
        {
            question: "What is Babel?",
            choices: [
                "JavaScript interpreter",
                "JavaScript transpiler",
                "JavaScript compiler",
                "None of the above",
            ],
            type: "MCQs",
            correctAnswer: "JavaScript compiler",
        },
    ],
};
export const resultInitialState = {
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0
}

export const quizOptions = {
    "Quiz 1": {
        "type": "MCQs",
        "questions": {},
        "images": {},
    },
    "Quiz 2": {
        "type": "MCQs+Images",
        "questions": {},
        "images": {},
    },
    "Quiz 3": {
        "type": "FIB",
        "questions": {},
        "images": {},
    }
}
export default { jsQuiz };