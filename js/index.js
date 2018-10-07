'use strict';

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
    numbOfRounds: 0
  };

    var showButtons = function() {
      params.pickPaper.classList.toggle('hideButtons');
      params.pickRock.classList.toggle('hideButtons');
      params.pickScissors.classList.toggle('hideButtons');    
    };

showButtons ();
 
params.newGame.addEventListener('click', function(){
  params.numbOfRounds = prompt('How many rounds do you want to play?');
  if(isFinite(params.numbOfRounds) && params.numbOfRounds > 0) {
    params.roundCount.innerHTML = 'You have chosen: ' + params.numbOfRounds + ' rounds to win the game!';
    showButtons() 
  }
  else {
    params.roundCount.innerHTML = 'Please, give a number!';
    params.newGame.classList.toggle('hideButtons');
  };
  params.newGame.classList.toggle('hideButtons');
  params.output.innerHTML = '';
  params.playerScore = 0;
  params.computerScore = 0;
});

var selectMove = document.getElementsByClassName('player-move');

for(var i = 0; i < selectMove.length; i++){
  selectMove[i].addEventListener('click', function(){
  var kindOfMove = this.getAttribute('data-move');
  playerMove(kindOfMove, computerMove());
  countingScores();
  gameOver ();
  });
};

var computerMove = function() {
    var computerNumber = Math.floor(Math.random() * 3  + 1);
    if (computerNumber == 1) {
      computerNumber = 'paper';
    } else if (computerNumber == 2) {
      computerNumber = 'rock';
    } else {
      computerNumber = 'scissors';
    }
  return computerNumber;
  };

var playerMove = function(kindOfMove,computerPick) {
      if (kindOfMove === computerPick) {
        params.output.innerHTML = 'It is DRAW!<br>You chose: '+ kindOfMove + ' computer chose: ' + computerPick + '<br>';
      } 
       else if ((kindOfMove === 'paper' && computerPick === 'rock') || 
               (kindOfMove === 'rock' && computerPick === 'scissors') ||
               (kindOfMove === 'scissors' && computerPick === 'paper')) {
                params.output.innerHTML = 'You WON !<br>You chose: ' + kindOfMove + ' and computer chose: ' + computerPick + '<br>';
                params.playerScore++;
      } 
       else {
        params.output.innerHTML = ' You LOST !<br>You chose: ' + kindOfMove + ' and computer chose: ' + computerPick + '<br>';
        params.computerScore++;
      };
  };
var countingScores = function (){
  params.playerScoreCount.innerHTML = 'Player score: ' + params.playerScore;
  params.computerScoreCount.innerHTML = 'Computer score: ' + params.computerScore;
};

var gameOver = function (){
  if(params.playerScore == params.numbOfRounds || params.computerScore == params.numbOfRounds){
    if (params.playerScore > params.computerScore) {
      params.output.innerHTML = 'GAME OVER! YOU WON ENTIRE GAME';
    }
    else {
      params.output.innerHTML = 'GAME OVER! YOU LOST ENTIRE GAME';
    };
    params.playerScoreCount.innerHTML = '';
    params.roundCount.innerHTML = '';
    params.computerScoreCount.innerHTML = '';
    showButtons();
    params.newGame.classList.toggle('hideButtons');
  } 
};