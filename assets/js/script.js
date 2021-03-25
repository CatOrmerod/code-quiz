// questions object //
var quizQuestions = [
    { 
        question: "Inside which HTML element do we put the JavaScript?",
        choices: ["<javascript>", "<script>", "<body>", "<js>"],
        answer: "<script>"
    },
    { 
        question: "What does CSS stand for?",
        choices: ["Computer Style Sheets", "Cascading Computer Sheets", "Creative Styling Sheets", "Cascading Style Sheets"],
        answer: "Cascading Style Sheets"
    },
    { 
        question: "Choose the correct HTML element for the largest heading:",
        choices: ["<h1>", "<heading>", "<h6>", "<head>"],
        answer: "<h1>"
    },
    { 
        question: "How to write an IF statement in JavaScript?",
        choices: ["if i = 5", "if(i == 5)", "if i = 5 then", "if (i == 5) then"],
        answer: "if(i == 5)"
    },
    { 
        question: "Which CSS property controls the text size?",
        choices: ["text-style", "font-style", "text-size", "font-size"],
        answer: "font-size"
    },
    { 
        question: "How can you make a numbered list?",
        choices: ["<ol>", "<list>", "<li>", "<ul>"],
        answer: "<ol>"
    }]

// global variables //

var questionIndex = 0;
var currentQuestion = quizQuestions[questionIndex];

var timer = 60;
var interval

// Event listener to start the game //
document.getElementById("start").addEventListener("click", startGame);

// Function to call the initial functions to begin the game //
function startGame () {
    updateDisplay();
    startTimer();
    loadQuestion ();
}

// Start timer function which begins the countdown at 60s, and alerts the user when the game is over //
function startTimer () {
    clearInterval (interval);
    timer = 60;
    interval = setInterval(function () {
        document.getElementById("time-remaining").innerHTML = timer
        if (timer === 0) {
            alert("You have lost this round")
            clearInterval (interval);
            interval = undefined
        }
        timer--
    }, 1000)
}

// Function to add both the question & choices to the screen //
function loadQuestion () {
    if (questionIndex === quizQuestions.length) {
        endquiz();
        return;
    }
    var currentQuestion = quizQuestions[questionIndex];
    document.getElementById("question").textContent = currentQuestion.question;
    document.getElementById("choice-1").textContent = currentQuestion.choices[0];
    document.getElementById("choice-2").textContent = currentQuestion.choices[1];
    document.getElementById("choice-3").textContent = currentQuestion.choices[2];
    document.getElementById("choice-4").textContent = currentQuestion.choices[3];
    
    console.log(currentQuestion.answer);
}

// Function to tell the quiz to save the score once the game is over //
function endquiz() {
    document.getElementById("highscores").style.display="block"
    document.getElementById("time-remaining").innerHTML = timer;
    document.getElementById("final-score").innerHTML = timer;
    document.getElementById("save-score").addEventListener("click", (e)=> {
        saveScore();
    })
    document.getElementById("answer-check").textContent = "Your final score is: " + timer;
    clearInterval (interval);
}
// Event listener to check which choice is selected by the user //
document.getElementById("choices").addEventListener("click", answerCheck)

// Function to check the user answer choice against the correct answer, 
// once checked provides a correct, or incorrect (and deducts time), the loads next Q //
function answerCheck(event) {
    event.preventDefault();
    var answerCorrect = quizQuestions[questionIndex].answer;
    console.log(answerCorrect);
    var answerUser = event.target.textContent;
    console.log(answerUser);
    if (answerUser === answerCorrect) {
        document.getElementById("answer-check").textContent = "Correct!  Well Done.";
        questionIndex++;
        loadQuestion(questionIndex);
    } else if (answerUser !== answerCorrect) {
        document.getElementById("answer-check").textContent = "Incorrect, the correct answer is " + answerCorrect;
        timer = timer - 10;
        questionIndex++
        loadQuestion(questionIndex);
    }
    
}

// Function to save the score to the local storage // 
function saveScore() {
    userNameInput = document.getElementById("username").value;
    var newScore = {
        name: userNameInput,
        score: timer
    };
    var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    highScores.push(newScore);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    console.log(highScores)
}

//Function to create a list to display the highscores within the highscores content area
document.getElementById("highscores-button").addEventListener("click", function(e){
    var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
        for (var i = 0; i < highScores.length; i++) {
            var createLi = document.createElement("li");
            createLi.textContent = highScores[i].name + " " + highScores[i].score;
            document.getElementById("highscores-content").appendChild(createLi);
        }
    })
    document.getElementById("highscores-list").style.display = "block";


document.getElementById("highscores-close").addEventListener("click", function(e){
    document.getElementById("highscores-list").style.display = "none";
})

// Function to update the display once the start button is clicked, to remove the image & button, 
// and replace with timer, and Questions //
function updateDisplay () {
    document.getElementById("hero").style.display = "none";
    document.getElementById("start").style.display = "none";
    document.getElementById("quiz-questions").style.display = "block";
    document.getElementById("scoreboard").style.display = "block";
}
