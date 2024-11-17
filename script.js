
const players = [];
let currentPlayerIndex = 0;
let timerInterval;
let currentRound = 1;

// Questions associées aux lettres
const questions = ["Nom d'animal", "Nom de pays", "Nom d'une ville", "Nom d'un fruit", "Nom d'une capitale"];

// Initialisation des joueurs
document.getElementById('player-count').addEventListener('change', function() {
    const count = parseInt(this.value);
    const playerNamesDiv = document.getElementById('player-names');
    playerNamesDiv.innerHTML = '';
    for (let i = 1; i <= count; i++) {
        const label = document.createElement('label');
        label.textContent = `Nom du joueur ${i} :`;
        const input = document.createElement('input');
        input.type = 'text';
        input.id = `player-${i}`;
        playerNamesDiv.appendChild(label);
        playerNamesDiv.appendChild(input);
    }
});

document.getElementById('start-game').addEventListener('click', () => {
    const count = parseInt(document.getElementById('player-count').value);
    for (let i = 1; i <= count; i++) {
        const name = document.getElementById(`player-${i}`).value || `Joueur ${i}`;
        players.push({ name, score: 0 });
    }
    startGame();
});

function startGame() {
    document.querySelector('.player-form').style.display = 'none';
    document.querySelector('.game-container').style.display = 'block';
    nextTurn();
}

function nextTurn() {
    if (timerInterval) clearInterval(timerInterval);
    if (currentRound > 5) return endGame();

    const player = players[currentPlayerIndex];
    document.getElementById('current-player').textContent = player.name;

    let htmlQuestions = '';
    questions.forEach((q, index) => {
        htmlQuestions += `<p>${q} :</p><input type="text" id="question-${index}">`;
    });
    document.getElementById('questions').innerHTML = htmlQuestions;

    startTimer();
}

function startTimer() {
    let timeLeft = 60;
    const timerDisplay = document.getElementById('timer');
    timerDisplay.textContent = timeLeft;
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endTurn();
        }
    }, 1000);
}

function endTurn() {
    const player = players[currentPlayerIndex];
    questions.forEach((_, index) => {
        const answer = document.getElementById(`question-${index}`).value.trim();
        if (answer) player.score += 10;
    });
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    if (currentPlayerIndex === 0) currentRound++;
    nextTurn();
}

function endGame() {
    document.querySelector('.game-container').style.display = 'none';
    document.querySelector('.end-game').style.display = 'block';
    const scoresList = document.getElementById('scores');
    players.sort((a, b) => b.score - a.score);
    players.forEach(player => {
        const li = document.createElement('li');
        li.textContent = `${player.name} : ${player.score} points`;
        scoresList.appendChild(li);
    });
}
