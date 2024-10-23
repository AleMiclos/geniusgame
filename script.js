const colors = ['red', 'green', 'blue', 'yellow'];
let sequence = [];
let playerSequence = [];
let level = 0;

const startButton = document.getElementById('start');
const circle = document.getElementById('circle');
const gameOverMessage = document.createElement('div');
const scoreDisplay = document.createElement('div');
const restartButton = document.createElement('button');

gameOverMessage.classList.add('game-over-message');
scoreDisplay.classList.add('score-display');
restartButton.classList.add('restart-button');

circle.appendChild(gameOverMessage);
circle.appendChild(scoreDisplay);
circle.appendChild(restartButton);

gameOverMessage.style.display = 'none';
document.body.appendChild(gameOverMessage);
document.body.appendChild(scoreDisplay);
document.body.appendChild(restartButton);

startButton.addEventListener('click', startGame);
restartButton.textContent = 'Reiniciar Jogo';
restartButton.style.display = 'none';
restartButton.addEventListener('click', startGame);

function startGame() {
    sequence = [];
    playerSequence = [];
    level = 0;
    gameOverMessage.style.display = 'none';
    scoreDisplay.textContent = '';
    restartButton.style.display = 'none';
    nextLevel();
}

function nextLevel() {
    playerSequence = [];
    level++;
    const nextColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(nextColor);
    displaySequence();
}

function displaySequence() {
    let i = 0;
    const interval = setInterval(() => {
        if (i >= sequence.length) {
            clearInterval(interval);
        } else {
            lightUp(sequence[i]);
            i++;
        }
    }, 1000);
}

function lightUp(color) {
    const colorDiv = document.getElementById(color);
    colorDiv.style.opacity = 0.5;
    setTimeout(() => {
        colorDiv.style.opacity = 1;
    }, 500);
    setTimeout(() => {
        colorDiv.addEventListener('click', handleClick);
    }, 500);
}

function handleClick(event) {
    const clickedColor = event.target.id;
    playerSequence.push(clickedColor);
    lightUpClick(clickedColor); 

    if (playerSequence[playerSequence.length - 1] !== sequence[playerSequence.length - 1]) {
        gameOver();
        return;
    }
    if (playerSequence.length === sequence.length) {
        scoreDisplay.textContent = `Nível: ${level}`;
        setTimeout(nextLevel, 1000);
    }
}

function lightUpClick(color) {
    const colorDiv = document.getElementById(color);
    colorDiv.style.opacity = 0.1; 
    setTimeout(() => {
        colorDiv.style.opacity = 1; 
    }, 150);
}

function gameOver() {
    gameOverMessage.textContent = 'Game Over!';
    scoreDisplay.textContent = `Sua pontuação: ${level}`;
    gameOverMessage.style.display = 'block';
    restartButton.style.display = 'block';
}
