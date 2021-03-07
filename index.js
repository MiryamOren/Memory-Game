// initializing the board

const initState = {
  pairsNum : 6,
};

function randomBetween(min, max){
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function boardInit(){
  let classesNums = [...Array(initState.pairsNum).keys()].concat([...Array(initState.pairsNum).keys()]);
  for (let i = 0; i < (initState.pairsNum * 2); i++){
    let newCard = document.createElement('div');
    let classNumIndx = randomBetween(0, classesNums.length - 1);
    newCard.classList.add(`card`);
    newCard.classList.add(`card${classesNums[classNumIndx]}`);
    newCard.setAttribute('data-in-game', 'true');
    classesNums.splice(classNumIndx, 1);
    document.querySelector('.board').appendChild(newCard);
  }
}
boardInit();


// the game

const gameState = {
  openCards : [],
  successes : 0,
  failures : 0,
  currentRound : null, //fail/success
  GameTimer : null,
  roundDuration : 1, // minute
  durationText : '1:00',
};

// game end & restart

function gameRestart(){
  var display = document.querySelector('.time');
  display.innerHTML = gameState.durationText;
  startTimer(display);
  document.querySelector('.board').innerHTML = '';
  boardInit();
  document.querySelector('.timer').classList.remove('display-none');
  document.querySelector('.game-end').classList.add('display-none');
  gameState.successes = 0;
  board.addEventListener('click', cardClick); 
}

function gameEnd(msg){
  board.removeEventListener('click', cardClick);
  clearInterval(gameState.GameTimer);
  const overlay = document.querySelector('.game-end');
  document.querySelector('.game-end__msg').innerHTML = msg;
  overlay.classList.remove('display-none');
  document.querySelector('.timer').classList.add('display-none');
  document.querySelector('.game-end__btn').addEventListener('click', gameRestart);
}

// game-round

function AfterRoundTimer(){
  if(gameState.currentRound === 'fail'){
    gameState.openCards[0].classList.remove('face');
    gameState.openCards[1].classList.remove('face');

    gameState.openCards[0].setAttribute('data-in-game', 'true');
    gameState.openCards[1].setAttribute('data-in-game', 'true');
  }

  board.addEventListener('click', cardClick);
  gameState.currentRound = null;
  gameState.openCards = [];
}

function cardClick(event){
  // check if card && if card in game
  if(event.target.classList[0] === 'card' && event.target.dataset.inGame === 'true'){
    console.log('im clicked!')
    event.target.setAttribute('data-in-game', 'false');
    gameState.openCards.push(event.target)
    event.target.classList.add('face');
  
    // 2 cards are open
    if (gameState.openCards.length === 2){
      board.removeEventListener('click', cardClick);

      // the cards match
      if (gameState.openCards[0].classList[1] === gameState.openCards[1].classList[1]){
        gameState.successes++;
        gameState.currentRound = 'success';
        if (gameState.successes === initState.pairsNum){
          gameEnd('You Won!')
        }
      }
      // the cards dont match
      else{
        gameState.failures++;
        gameState.currentRound = 'fail';
      }
      setTimeout(AfterRoundTimer, 1000);
    }
  }
}


const board = document.querySelector('.board');
board.addEventListener('click', cardClick); 

// game timer
function startTimer(display) {
  var timer = 60 * gameState.roundDuration, minutes, seconds;
  gameState.GameTimer = setInterval(function () {
      minutes = parseInt(timer / 60, 10)
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        clearInterval(gameState.GameTimer);
        display.textContent = '00:00'
        gameEnd('Game Over')

      }
  }, 1000);
}

window.onload = function () {
  var display = document.querySelector('.time');
  startTimer(display);
};