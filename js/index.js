var params = {
  output: document.getElementById('output'),
  pickRock: document.getElementById('rock-button'),
  pickPaper: document.getElementById('paper-button'),
  pickScissors: document.getElementById('scissors-button'),
  result: document.getElementById('result'),
  newGame: document.getElementById('new-game'),
  playerScoreCount: document.getElementById('player-score'),
  computerScoreCount: document.getElementById('computer-score'),
  roundCount: document.getElementById('round-to-play'),
  playerScore: 0,
  computerScore: 0,
  numbOfRounds: 0,
  winner: '',
  progress: []
};

var showButtons = function(){
  params.pickPaper.classList.toggle('hideButtons');
  params.pickRock.classList.toggle('hideButtons');
  params.pickScissors.classList.toggle('hideButtons');    
};

showButtons ();
 
params.newGame.addEventListener('click', function(){
  params.numbOfRounds = prompt('How many rounds do you want to play?');
  if(isFinite(params.numbOfRounds) && params.numbOfRounds > 0) {
    params.roundCount.innerHTML = 'You have chosen: ' + params.numbOfRounds + ' rounds to win the game!';
    showButtons();
  }else {
    params.roundCount.innerHTML = 'Please, give a number!';
    params.newGame.classList.toggle('hideButtons');
  };
  params.newGame.classList.toggle('hideButtons');
  params.output.innerHTML = '';
  params.playerScore = 0;
  params.computerScore = 0;
  params.progress = [];
});

var selectMove = document.getElementsByClassName('player-move');

for(var i = 0; i < selectMove.length; i++){
  selectMove[i].addEventListener('click', function(){
  var kindOfMove = this.getAttribute('data-move');
  playerMove(kindOfMove, params.winner, params.playerScore, params.computerScore, computerMove());
  countingScores();
  gameOver();
  });
};

var computerMove = function() {
  var computerNumber = Math.floor(Math.random() * 3  + 1);
  if(computerNumber == 1) {
    computerNumber = 'paper';
  }else if(computerNumber == 2) {
    computerNumber = 'rock';
  }else {
    computerNumber = 'scissors';
  }
  return computerNumber;
};

var playerMove = function(kindOfMove,winner,playerScore,computerScore, computerPick) {
  if(kindOfMove === computerPick) {
    params.output.innerHTML = 'It is DRAW!<br>You chose: '+ kindOfMove + ' computer chose: ' + computerPick + '<br>';
    params.winner = 'no one';
  }else if(
    (kindOfMove === 'paper' && computerPick === 'rock') || 
    (kindOfMove === 'rock' && computerPick === 'scissors') ||
    (kindOfMove === 'scissors' && computerPick === 'paper')) {
      params.output.innerHTML = 'You WON !<br>You chose: ' + kindOfMove + ' and computer chose: ' + computerPick + '<br>';
      params.playerScore++;
      params.winner = 'player';
  }else {
      params.output.innerHTML = ' You LOST !<br>You chose: ' + kindOfMove + ' and computer chose: ' + computerPick + '<br>';
      params.computerScore++;
      params.winner = 'computer';
  }
  params.progress.push({
    playerMove: kindOfMove,
    computerMove: computerPick,
    playerScore: params.playerScore,
    computerScore: params.computerScore,
    winner: params.winner,
  });
};

var countingScores = function (){
  params.playerScoreCount.innerHTML = 'Player score: ' + params.playerScore;
  params.computerScoreCount.innerHTML = 'Computer score: ' + params.computerScore;
};

var gameOver = function (){
  if(params.playerScore == params.numbOfRounds || params.computerScore == params.numbOfRounds) {
    if (params.playerScore > params.computerScore) {
      showResult('YOU WON ENTIRE GAME');
    } else {
      showResult('YOU LOST ENTIRE GAME');
    };
    params.output.innerHTML = '';
    params.playerScoreCount.innerHTML = '';
    params.roundCount.innerHTML = '';
    params.computerScoreCount.innerHTML = '';
    params.newGame.classList.toggle('hideButtons');
    showButtons();
  }
};

var showResult = function(text){
  var showModals = document.getElementsByClassName('result');
  for(var i = 0; i < showModals.length; i++){
  showModals[i].classList.add('show');
  };
  var tableResult = document.querySelector('tbody');
  tableResult.innerHTML = '';
  for (var j = 0; j < params.progress.length; j++) {
  tableResult.innerHTML += '<tr><td>' + params.progress[j].playerMove + '</td><td>' + params.progress[j].computerMove +'</td><td>' + params.progress[j].computerScore + '</td><td>' + params.progress[j].playerScore +'</td><td>' + params.progress[j].winner + '</td></tr>'; 
  };
  document.querySelector('header').innerHTML = text;
};

var hideModal = function(event){
	event.preventDefault();
  document.querySelector('#modal-overlay').classList.remove('show');
  
};

var closeButtons = document.querySelectorAll('.close');
for(var i = 0; i < closeButtons.length; i++){
  closeButtons[i].addEventListener('click', hideModal)
}

var modals = document.querySelectorAll('.modal');
for(var i = 0; i < modals.length; i++){
  modals[i].addEventListener('click', function(event){
    event.stopPropagation();
  });
}