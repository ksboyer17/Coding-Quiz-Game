const question =document.querySelector('#question');
const choices = Array.from(document.querySelector('.choice-content'));
const progress =document.querySelector('#progress');
const scoreText =document.querySelector('#score');
const timer =document.querySelector('#time-clock');

var currentQuestion = {};
var acceptingAnswers = true;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];

//Question Variables 
var questions = [
    {
        question: 'lorem ipsum 1',
        choice1: 'option 1',
        choice2: 'option 2',
        choice3: 'option 3',
        choice4: 'option 4',
        answer: 2,
    },
    {
        question: 'lorem ipsum 2',
        choice1: 'option 1',
        choice2: 'option 2',
        choice3: 'option 3',
        choice4: 'option 4',
        answer: 1,
    },
    {
        question: 'lorem ipsum 3',
        choice1: 'option 1',
        choice2: 'option 2',
        choice3: 'option 3',
        choice4: 'option 4',
        answer: 4,
    },
    {
        question: 'lorem ipsum 4',
        choice1: 'option 1',
        choice2: 'option 2',
        choice3: 'option 3',
        choice4: 'option 4',
        answer: 3,
    }

]
//Capital because I do not plan to change it
const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...question];
    getNewQuestion();
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign('/final.html');
    }
    
    questionCounter++;
    progressText.innerText = `question, ${questionCounter} of ${MAX_QUESTIONS}`;
    
  
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;
    
    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number] ;  
    })
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
}

choices.forEach(choice => {
     choice.addEventListner('click', e => {
         if(!acceptingAnswers) return;
            
         acceptingAnswers = false;
         const selectedChoice = e.target;
         const selectedAnswer = selectedChoice.dataset['number'];
//Toggle green css or red css depending on right or wrong
        var classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'
//Award points when correct answer is selected
         if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
            
        },1000)
    })
})

incrementScore = num => {
    score +=num;
    scoreText.innterText = score;
}

startGame();