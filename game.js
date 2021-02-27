const question =document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-content'));
const progress =document.querySelector('#progress');
const scoreText =document.querySelector('#score');
const count =document.querySelector('.count');

var currentQuestion = {};
var acceptingAnswers = true;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];

//timer function
var sec = 60;
var time = setInterval(myTimer, 1000);

function myTimer() {
    document.getElementById('seconds').innerHTML = sec + " sec left";
    sec--;
    if (sec < 0) {
        clearInterval(time);
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('./final.html');
    }
}

//Question Variables 
var questions = [
    {
        question: ' What is the HTML tag under which one can write the JavaScript code?',
        choice1: '<javascript>',
        choice2: '<scripted>',
        choice3: '<script>',
        choice4: '<js>',
        answer: 3,
    },
    {
        question: ' Which of the following is not a reserved word in JavaScript?',
        choice1: 'interface',
        choice2: 'throws',
        choice3: 'program',
        choice4: 'short',
        answer: 3,
    },
    {
        question: 'Which of the following is correct about features of JavaScript?',
        choice1: 'JavaScript is is complementary to and integrated with HTML.',
        choice2: 'JavaScript is open and cross-platform.',
        choice3: 'Both of the above.',
        choice4: 'All of the above.',
        answer: 3,
    },
    {
        question: 'Which of the following is a valid type of function javascript supports?',
        choice1: 'named function',
        choice2: 'anonymous function',
        choice3: 'Both of the above.',
        choice4: 'None of the above.',
        answer: 3,
    }

]
//Capital because I do not plan to change it
const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0;
    score = 0;
    console.log(availableQuestions)
    getNewQuestion();
}

getNewQuestion = () => {
    if(questionCounter === questions.length) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('./final.html');
    }
    currentQuestion = questions[questionCounter];
    question.innerText = currentQuestion.question;
    console.log(choices);
    choices.forEach(choice => {
        const number = choice.dataset['number'];
        console.log(number)
        choice.innerText = currentQuestion['choice' + number] ;  
    })
   

    acceptingAnswers = true;
}
//event choice listener
function answersEvents () {
choices.forEach(choice => {
     choice.addEventListener('click', e => {
         if(!acceptingAnswers) {
             return
         };
         acceptingAnswers = false;
         const selectedChoice = e.target;
         const selectedAnswer = parseInt(selectedChoice.dataset['number']);
//Toggle green css or red css depending on right or wrong

         if (selectedAnswer === currentQuestion.answer) {
             scoreText.textContent = (score += SCORE_POINTS)
         }
        var classToApply = selectedAnswer === currentQuestion.answer ? 'correct' :
        'incorrect'
        if (selectedAnswer != currentQuestion.answer) {
            sec -= 10;
        }

        selectedChoice.parentElement.classList.add(classToApply);
//quesiton transition time to next question
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            questionCounter++;
            getNewQuestion();
            
        },1000)
   })
})
}

answersEvents();

startGame();

localStorage.removeItem("mostRecentScore");