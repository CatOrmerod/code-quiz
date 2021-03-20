// questions variable
var questions [
    { 
        question: "Question 1 Question",
        choices: ["A answer", "B answer", "C answer", "D answer"],
        answer: "Question 1 Answer"
    },
    { 
        question: "Question 2 Question",
        choices: ["A answer", "B answer", "C answer", "D answer"],
        answer: "Question 2 Answer"
    },
    { 
        question: "Question 3 Question",
        choices: ["A answer", "B answer", "C answer", "D answer"],
        answer: "Question  Answer"
    },
    { 
        question: "Question 4 Question",
        choices: ["A answer", "B answer", "C answer", "D answer"],
        answer: "Question 4 Answer"
    },
    { 
        question: "Question 5 Question",
        choices: ["A answer", "B answer", "C answer", "D answer"],
        answer: "Question 5 Answer"
    },
    { 
        question: "Question 6 Question",
        choices: ["A answer", "B answer", "C answer", "D answer"],
        answer: "Question 6 Answer"
    },
]

// other variables

var questionsRandom = "";

var timer = 60;
var deducter = 0;
var interval

document.getElementById("start").addEventListener("click, startGame");

function startGame () {
    startTimer();
    
}

function startTimer () {
    clearInterval (interval);
    timer = 60;
    interval = setInterval(function () {
        document.getElementById("time-remaining").innerHTML = timer
        if (timer === 0 {
            alert("You have lost this round")
            clearInterval (interval);
            interval = undefined
        }
        timer--
    }, 1000)
}