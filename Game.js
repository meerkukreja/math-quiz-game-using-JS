const scoreValueElement = document.querySelector("#scoreValue")
const correctPillElement = document.querySelector("#correct")
const wrongPillElement = document.querySelector("#wrong")
const quesionHolder = document.querySelector("#question")
const startResetButton = document.querySelector("#startreset")
const timeRemainingElement = document.querySelector("#timeremaining")
const timeRemainingValueElement = document.querySelector("#timeremainingValue")
const gameOverElement = document.querySelector("#gameover")
const optionsElement = document.querySelectorAll('.options')

//State variables or helper variables

let playing = false;
let score;
let timeRemaining;
let countDown;
let correctAns;
let correctAnsPosition;

loadEvents();

function loadEvents(){
    startResetButton.addEventListener('click', handleStartReset)

    optionsElement.forEach(function(optionsElement) {
        optionsElement.addEventListener('click', handleOptionClick)
    });
}

function handleStartReset(e){
    if(playing) {
        //user pressed reset button
        window.location.reload()
    }
    else{
        playing = true;

        //this is useful when the user starts game again
        hide(gameOverElement);

        setText(startResetButton, "Reset Game") 

        score = 0;
        setText(scoreValueElement, score)
        show(timeRemainingElement)
        timeRemaining = 60;
        setText(timeRemainingValueElement, timeRemaining)

        generateQA();

        startCountDown()
    }
}

function handleOptionClick(e){
    const clickOptionPosition = parseInt(this.getAttribute('data-position'));

    if(clickOptionPosition === correctAnsPosition) {
        score++;
        setText(scoreValueElement, score);

        showCorrectPillElement();

        generateQA();
    }
    else
    {
        showWrongPillElement();
    }
}

function generateQA() {
    let num1 = generateRandomNumber(10);
    let num2 = generateRandomNumber(10);
    correctAns = num1 * num2;

    setText(quesionHolder, `${num1} x ${num2}`);

    correctAnsPosition = generateRandomNumber(4);


    const correctBoxId = `#box${correctAnsPosition}`;
    const correctBoxElement = document.querySelector(correctBoxId);
    setText(correctBoxElement, correctAns);

    let options = [correctAns];
    // Generate 3 random options
    for(let i=1;i<=4;i++){
        let wrongAnswer;
        if(i!==correctAnsPosition){
            do{
                const randomFirstNum = generateRandomNumber(10);
                const randomSecondNum = generateRandomNumber(10);
                wrongAnswer = randomFirstNum * randomSecondNum
            } while(options.indexOf(wrongAnswer)!== -1)

            options.push(wrongAnswer);

            const wrongBoxId = `#box${i}`
            const  wrongBoxElement = document.querySelector(wrongBoxId);
            setText(wrongBoxElement, wrongAnswer);
        }
    }
}


//Helper Methods

function startCountDown(){
    countDown = setInterval(function(){
        timeRemaining--;
        if(timeRemaining<=0){
            stopCountDown();
            playing = false;

            show(gameOverElement);
            const message = `<p>Game Over</p><p>Your Score : ${score}</p>`;
            setText(gameOverElement, message);

            setText(startResetButton, "Start Game");

            hide(timeRemainingElement);
        }
        setText(timeRemainingValueElement, timeRemaining)
    },1000);
}

function setText(element, text)
{
    element.innerHTML = text;
}

function show(element){
    element.style.display = 'block'
}

function hide(element){
    element.style.display = 'none'
}

function stopCountDown(){
    clearInterval(countDown);
}

function  generateRandomNumber(till = 10){
    return (1 + Math.round(Math.random()*(till-1)));
}

function showCorrectPillElement() {
    hide(wrongPillElement);
    show(correctPillElement);
    setTimeout(function() {
        hide(wrongPillElement);
    },500);
}

function showWrongPillElement() {
    hide(correctPillElement);
    show(wrongPillElement);
    setTimeout(function() {
        hide(wrongPillElement);
    },500);
}