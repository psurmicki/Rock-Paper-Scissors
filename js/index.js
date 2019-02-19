const moves = [...document.querySelectorAll('.select img')];
const printNumbOfRounds = document.querySelector('p.numbers span');
const printWhoWin = document.querySelector('[data-summary="who-win"]');
const winResult = document.querySelector('p.wins span');
const loseResult = document.querySelector('p.losses span');
const drawResult = document.querySelector('p.draws span');
const printPlayerChoice = document.querySelector('[data-summary="your-choice"]');
const printAIChoice = document.querySelector('[data-summary="ai-choice"]');
const startBtn = document.querySelector('.start');
const gameSummary = {
  numbers: 0,
  wins: 0,
  losses: 0,
  draws: 0,
  playerMove: '',
  computerMove: '',
  progress: []
};

function moveSelection() {
  gameSummary.playerMove = this.dataset.option;
  moves.forEach(move => move.style.boxShadow = '');
  this.style.boxShadow = '0 0 0 5px red';
};

function computerChoice() {
  const aiChoice = moves[Math.floor(Math.random() * 3)].dataset.option;
  return aiChoice;
};

function checkResult(player, ai) {
  if (player === ai) {
    return 'draw'
  } else if (player === 'paper' && ai === 'rock' || player === 'rock' && ai === 'scissors' || player === 'scissors' && ai === 'paper') {
    return 'win'
  } else {
    return 'loss'
  }
};

function publishResult(player, ai, result) {
  printPlayerChoice.textContent = player;
  printAIChoice.textContent = ai;
  switch (result) {
    case 'win':
      printNumbOfRounds.textContent = --gameSummary.numbers;
      winResult.textContent = ++gameSummary.wins;
      printWhoWin.textContent = 'You won :)';
      break;
    case 'loss':
      printNumbOfRounds.textContent = --gameSummary.numbers;
      loseResult.textContent = ++gameSummary.losses;
      printWhoWin.textContent = 'You lost :(';
      break;
    case 'draw':
      printNumbOfRounds.textContent = --gameSummary.numbers;
      drawResult.textContent = ++gameSummary.draws;
      printWhoWin.textContent = 'draw :\\';
  }
  gameSummary.progress.push({
    playerMove: player,
    computerMove: ai,
    playerScore: gameSummary.wins,
    computerScore: gameSummary.losses,
    winner: result,
  });
}

function newGame() {
  gameSummary.numbers = prompt('Please, enter number of rounds!');
  if ((isFinite(gameSummary.numbers)) && (gameSummary.numbers > 0)) {
    printNumbOfRounds.textContent = gameSummary.numbers;
    showAndHideEl()
  } else {
    alert('Please, enter a number!');
  }
};

function endGame() {
  if (!gameSummary.numbers) {
    if (gameSummary.wins > gameSummary.losses) {
      showTableResult('YOU WON ENTIRE GAME');
      document.querySelector('.modal').style.background = 'rgb(103, 201, 58)';
    } else if (gameSummary.wins < gameSummary.losses) {
      showTableResult('YOU LOST ENTIRE GAME');
      document.querySelector('.modal').style.background = 'rgb(255, 33, 25)';
    } else if ((gameSummary.wins + gameSummary.draws) == (gameSummary.losses + gameSummary.draws)) {
      showTableResult('YOU DRAW ENTIRE GAME');
      document.querySelector('.modal').style.background = 'rgb(137, 185, 240)';
    }
    document.querySelector(`[data-option ='${gameSummary.playerMove}']`).style.boxShadow = '';
    printWhoWin.textContent = '';
    printPlayerChoice.textContent = '';
    printAIChoice.textContent = '';
    winResult.textContent = 0;
    loseResult.textContent = 0;
    drawResult.textContent = 0;
    gameSummary.numbers = 0;
    gameSummary.wins = 0;
    gameSummary.losses = 0;
    gameSummary.draws = 0;
    gameSummary.playerMove = '';
    gameSummary.computerMove = '';
    gameSummary.progress = [];
    showAndHideEl()
  }
};

function startGame() {
  gameSummary.computerMove = computerChoice();
  const gameResult = checkResult(gameSummary.playerMove, gameSummary.computerMove);
  publishResult(gameSummary.playerMove, gameSummary.computerMove, gameResult);
  endGame();
};

function showAndHideEl() {
  document.querySelector('#container').classList.toggle('show');
  startBtn.classList.toggle('show');
};

function showTableResult(text) {
  document.querySelectorAll('.result').forEach(modal => modal.classList.add('showResult'))
  let tableResult = document.querySelector('tbody');
  tableResult.textContent = '';
  for (let i = 0; i < gameSummary.progress.length; i++) {
    tableResult.innerHTML += `<tr><td>${gameSummary.progress[i].playerMove}</td><td>${gameSummary.progress[i].computerMove}</td><td>${gameSummary.progress[i].computerScore}</td><td>${gameSummary.progress[i].playerScore}</td><td>${gameSummary.progress[i].winner}</td></tr>`;
  };
  document.querySelector('header').textContent = text;
};

document.querySelector('a').addEventListener('click', function (e) {
  e.preventDefault();
  document.querySelector('.overlay').classList.remove('showResult');
});

moves.forEach(move => move.addEventListener('click', moveSelection));
moves.forEach(move => move.addEventListener('click', startGame));

startBtn.addEventListener('click', newGame);