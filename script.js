function playerFactory(name, token, CLASS_NAME) {
  return { name, token, CLASS_NAME };
}
function checkWin(squares) {
  const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  function checkLength(string) {
    return string.length == 8;
  }
  winningCombination.forEach((array) => {
    let firstElement = squares[array[0]].className;
    let secondElement = squares[array[1]].className;
    let thirdElement = squares[array[2]].className;

    if (checkLength(firstElement)) {
      if (firstElement == secondElement && firstElement == thirdElement) {
        console.log(currentPlayer.name + ' wins');
        gameOver(squares);
      }
    }
  });
}
const player1 = playerFactory('Player 1', 1, 'x');
const player2 = playerFactory('Player 2', 0, 'o');

let currentPlayer = player1;

const turnChanger = function () {
  currentPlayer = currentPlayer == player1 ? player2 : player1;
};

function gameOver(squares) {
  const body = document.querySelectorAll(
    'body > h1, body > main, body > button, footer'
  );
  const gameOverCard = document.querySelector('.gameover');
  const winningPlayerName = document.querySelector('#winningPlayer');
  winningPlayerName.textContent = currentPlayer.name;
  gameOverCard.style.display = 'block';
  body.forEach((element) => {
    element.classList.toggle('blur');
  });
  squares.forEach((square) => {
    square.removeEventListener('click', clickHandler);
  });
}

function clickHandler(e) {
  e.target.classList.toggle(currentPlayer.CLASS_NAME);
  checkWin(squares);
  turnChanger();
}
const squares = document.querySelectorAll('.square');
let renderBoard = function () {
  squares.forEach((square) => {
    square.addEventListener('click', clickHandler, { once: true });
  });

  return { clickHandler };
};
renderBoard();
