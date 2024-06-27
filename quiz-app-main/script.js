const questions = [
    {
        question: "What is the oldest attraction in Magic Kingdom?",
        answers: [
            { text: "Haunted Mansion", correct: false},
            { text: "Prince Charming Regal Carousel", correct: true},
            { text: "Peter Pan's Flight", correct: false},
            { text: "Pirates of the Caribbean", correct: false},
        ]
    },
    {
        question: "Which is the smallest and largest theme park at Disney World?",
        answers: [
            { text: "Magic Kingdom and Animal Kingdom", correct: true},
            { text: "Hollywood Studios and EPCOT", correct: false},
            { text: "Magic Kingdom and EPCOT", correct: false},
            { text: "Hollywood Studios and Animal Kingdom", correct: false},
        ]
    },
    {
        question: "The monorail runs through the lobby of which Disney Resort?",
        answers: [
            { text: "Grand Floridian Resort & Spa", correct: false},
            { text: "Polynesian Resort", correct: false},
            { text: "Wildnerness Lodge", correct: false},
            { text: "Contemporary Resort", correct: true},
        ]
    },
    {
        question: "When did Disney World first open to the public?",
        answers: [
            { text: "August 1, 1971", correct: false},
            { text: "October 1, 1971", correct: true},
            { text: "September 1, 1971", correct: false},
            { text: "November 1, 1971", correct: false},
        ]
    }  
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();