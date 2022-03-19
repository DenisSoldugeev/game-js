const startButton = document.querySelector('#start');
const game = document.querySelector('#game');
const timeHeader = document.querySelector('#time-header');
const resultHeader = document.querySelector('#result-header');
let time = document.querySelector('#time');
let result = document.querySelector('#result');
let gameTime = document.querySelector('#game-time');

let score = 0
let isGameStarted = false;

startButton.addEventListener('click', startGame);
game.addEventListener('click', handleBoxClick)
gameTime.addEventListener('input', setGameTime)

function show(el) {
    el.classList.remove('hide')
}

function hide(el) {
    el.classList.add('hide')
}


function startGame() {
    score = 0;
    setGameTime();
    gameTime.setAttribute('disabled', true);
    isGameStarted = true;
    hide(startButton);
    game.style.backgroundColor = '#fff'

    const interval = setInterval(() => {
        let timeMs = parseFloat(time.textContent)

        if (timeMs <= 0) {
            clearInterval(interval);
            endGame();
        } else {
            time.textContent = (timeMs - 0.1).toFixed(1);
        }
    }, 100)

    renderBox();
}

function setGameScore() {
    result.textContent = score.toString();
}

function setGameTime() {
    timeMs = +gameTime.value;
    time.textContent = timeMs.toFixed(1);
    show(timeHeader);
    hide(resultHeader);
}

function endGame() {
    isGameStarted = false;
    setGameScore();
    show(startButton);
    game.innerHTML = '';
    game.style.backgroundColor = '#ccc';
    hide(timeHeader);
    show(resultHeader);
    gameTime.removeAttribute('disabled');
}

function handleBoxClick(event) {
    if (!isGameStarted) {
        return
    }

    if (event.target.dataset.box) {
        score++
        renderBox()
    }
}

function renderBox() {
    game.innerHTML = '';
    const box = document.createElement('div');
    const boxSize = getRandom(30, 100);
    const gameSize = game.getBoundingClientRect();
    const maxTop = gameSize.height - boxSize;
    const maxLeft = gameSize.width - boxSize;
    console.log(boxSize)

    box.style.height = box.style.width = boxSize + 'px';
    box.style.position = 'absolute';
    box.style.backgroundColor = 'rgb(' + getRandom(0, 255) + ', ' + getRandom(0, 255) + ', ' + getRandom(0, 255) + ')';
    box.style.top = getRandom(0, maxTop) + 'px';
    box.style.left = getRandom(0, maxLeft) + 'px';
    box.style.cursor = 'pointer';
    box.setAttribute('data-box', 'true')

    game.insertAdjacentElement("afterbegin", box)
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}