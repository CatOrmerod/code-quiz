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
            losses++
            clearInterval (interval);
            interval = undefined
            document.getElementById("losses").innerHTML = losses
            document.getElementById("time-deducted").innerHTML = losses*10
        }
        timer--
    }, 1000)
}

function loadQuestion () {
    if (questionIndex === quizQuestions.length) {
        return finalScore ();
    }
    var currentQuestion = quizQuestions[questionIndex];
    document.getElementById("question").textContent = currentQuestion.question;
    document.getElementById("choice-1").textContent = currentQuestion.choices[0];
    document.getElementById("choice-2").textContent = currentQuestion.choices[1];
    document.getElementById("choice-3").textContent = currentQuestion.choices[2];
    document.getElementById("choice-4").textContent = currentQuestion.choices[3];
    
    console.log(currentQuestion.answer);
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
        console.log(currentQuestion);
    } else if (answerUser !== answerCorrect) {
        document.getElementById("answer-check").textContent = "Incorrect, the correct answer is " + answerCorrect;
        timer = timer - 10;
        questionIndex++
        loadQuestion(questionIndex);
        console.log(currentQuestion);
    }
    
}