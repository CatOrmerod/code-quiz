// questions variable
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

// other variables

var questionIndex = 0;
var currentQuestion = quizQuestions[questionIndex];

var timer = 60;
var deducter = 0;
var interval
var losses = 0;
var wins = 0;

document.getElementById("start").addEventListener("click", startGame);
document.getElementById("highscores-button").addEventListener("click", function(e){
    var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    var content = document.getElementById("highscores-content")
    var table = document.createElement("table")
    content.appendChild(table);
    highScores.map ((e)=> {
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        tr.appendChild(td);
        td.innerHTML = e.name;
        var td = document.createElement("td");
        td.innerHTML = e.score;
        tr.appendChild(td);
        table.appendChild(tr);
    })
    document.getElementById("highscores-list").style.display = "block";
})
document.getElementById("highscores-close").addEventListener("click", function(e){
    document.getElementById("highscores-list").style.display = "none";
})

function startGame () {
    startTimer();
    loadQuestion ();
}

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

function endquiz() {
    document.getElementById("highscores").style.display="block"
    document.getElementById("time-remaining").innerHTML = timer;
    document.getElementById("final-score").innerHTML = timer;
    document.getElementById("save-score").addEventListener("click", (e)=> {
        saveScore();
    })
    clearInterval (interval);
}

document.getElementById("choices").addEventListener("click", answerCheck)

function answerCheck(event) {
    event.preventDefault();
    var answerCorrect = quizQuestions[questionIndex].answer;
    console.log(answerCorrect);
    var answerUser = event.target.textContent;
    console.log(answerUser);
    if (answerUser === answerCorrect) {
        document.getElementById("answer-check").textContent = "Correct!  Well Done.";
        questionIndex++;
        wins++
        loadQuestion(questionIndex);
    } else if (answerUser !== answerCorrect) {
        document.getElementById("answer-check").textContent = "Incorrect, the correct answer is " + answerCorrect;
        timer = timer - 10;
        questionIndex++
        loadQuestion(questionIndex);
    }
    
}

function finalScore() {
    if(timer > 0);
    var score = timer;
    clearInterval(interval);
    document.getElementById("answer-check").textContent = "Your final score is: " + score;
    saveScore();
}
 
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