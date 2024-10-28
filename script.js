const colors = ['red', 'green', 'blue', 'yellow'];
let sequence = [];
let playerSequence = [];
let level = 0;
let playerName = '';
let nameInput; // Variável para o campo de entrada
let saveScoreButton; // Variável para o botão de salvar

// Elementos do DOM
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

restartButton.textContent = 'Reiniciar Jogo';
restartButton.style.display = 'none';
restartButton.addEventListener('click', startGame);
startButton.addEventListener('click', startGame);

function startGame() {
    playerName = ''; // Limpa o nome do jogador ao iniciar o jogo
    sequence = [];
    playerSequence = [];
    level = 0;
    gameOverMessage.style.display = 'none';
    scoreDisplay.textContent = '';
    restartButton.style.display = 'none';
    
    // Remove os campos de entrada e o botão de salvar, se existirem
    removeInputField();
    
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

    // Chama a função para criar o campo de entrada e o botão de salvar
    createInputField();
}

function createInputField() {
    // Cria o campo de entrada apenas se não existir
    if (!nameInput) {
        nameInput = document.createElement('input'); // Campo de entrada para o nome
        nameInput.placeholder = 'Digite seu nome';
        nameInput.classList.add('name-input'); // Adicione suas classes de estilo aqui
        document.body.appendChild(nameInput);
        
        saveScoreButton = document.createElement('button'); // Botão para salvar o placar
        saveScoreButton.textContent = 'Salvar Placar';
        saveScoreButton.classList.add('save-button'); // Adicione suas classes de estilo aqui
        document.body.appendChild(saveScoreButton);

        saveScoreButton.addEventListener('click', () => {
            const username = nameInput.value.trim();
            if (username) {
                playerName = username; // Atualiza o nome do jogador
                saveScore(playerName, level);
                removeInputField(); // Remove os campos após salvar
            } else {
                alert('Por favor, insira seu nome!');
            }
        });
    }
}

function removeInputField() {
    if (nameInput) {
        document.body.removeChild(nameInput); // Remove o campo de entrada
        nameInput = null; // Limpa a variável
    }
    if (saveScoreButton) {
        document.body.removeChild(saveScoreButton); // Remove o botão de salvar
        saveScoreButton = null; // Limpa a variável
    }
}

function saveScore(username, score) {
    fetch('https://apimongodb-3dq1.onrender.com/save-score/genius', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, score })
    })
    .then(response => response.text())
    .then(data => console.log(data)) // Exibe a resposta do servidor no console
    .catch(error => console.error('Erro ao salvar o placar:', error));
}
