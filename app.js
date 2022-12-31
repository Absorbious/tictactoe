// Declaring all the variables and connecting the DOM elements to the script
const boxes = document.querySelectorAll(".box");
const resetBox = document.querySelector(".reset-game");
const playerX = document.querySelector(".player-x");
const playerO = document.querySelector(".player-o");
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const winningMessage = document.querySelector(".result-text");
const character = "X";

// Variable that changes as the turn of the players change
let turnSwap;

// Event listeners for the player selection buttons and the reset button
playerX.addEventListener("click", startGame, { once: true });
playerO.addEventListener("click", startGame, { once: true });
resetBox.addEventListener("click", resetGame);

// Event listener for the boxes of the gameboard
boxes.forEach((box) => {
  box.addEventListener("click", handleClick, { once: true });
});

// Function that starts the game
function startGame(e) {
  if (e.target === playerO) {
    turnSwap = !turnSwap;
  } else {
    turnSwap;
  }
}

// Function that handles the clicks to the gameboard and has all the functions that run the game, check if it's ended and how it's ended
function handleClick(e) {
  console.log("clicked");
  const currentCharacter = turnSwap
    ? (e.target.innerText = "O")
    : (e.target.innerText = "X");
  if (checkWin(currentCharacter)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
}

// Function for ending the game if it's a draw or a win
function endGame(draw) {
  if (draw) {
    winningMessage.innerText = "It's a draw";
  } else {
    winningMessage.innerText = `${turnSwap ? '"O" wins' : '"X" wins'}`;
    boxes.forEach((box) => {
      box.removeEventListener("click", handleClick);
    });
  }
}

// Function that checks if there's a draw by comparing the content of the boxes
function isDraw() {
  return [...boxes].every((cell) => {
    console.log("hey");
    return cell.innerText === "X" || cell.innerText === "O";
  });
}

// Function for swapping the turns between players
function swapTurns() {
  turnSwap = !turnSwap;
}

// Function that resets the game by clicking on the reset button
function resetGame() {
  boxes.forEach((box) => {
    box.innerText = "";
    box.addEventListener("click", handleClick, { once: true });
  });
  winningMessage.innerText = "";
  turnSwap = false;
}

// Function that loops over the combinations array and if there is a match it gives us the player that got it
function checkWin(currentCharacter) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return boxes[index].innerText === currentCharacter;
    });
  });
}
