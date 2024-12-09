// script.js
const board = document.getElementById('board');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset');

let gameState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Initialize the game board
function initializeBoard() {
  board.innerHTML = '';
  gameState.forEach((cell, index) => {
    const cellDiv = document.createElement('div');
    cellDiv.dataset.index = index;
    cellDiv.addEventListener('click', handleCellClick);
    board.appendChild(cellDiv);
  });
  updateStatus();
}

// Handle cell click
function handleCellClick(e) {
  const cellIndex = e.target.dataset.index;

  if (gameState[cellIndex] === "" && isGameActive) {
    gameState[cellIndex] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWin()) {
      statusDisplay.textContent = `Player ${currentPlayer} Wins!`;
      isGameActive = false;
      return;
    }

    if (gameState.every(cell => cell !== "")) {
      statusDisplay.textContent = "It's a Draw!";
      isGameActive = false;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatus();
  }
}

// Update the status message
function updateStatus() {
  if (isGameActive) {
    statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

// Check for winning conditions
function checkWin() {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => gameState[index] === currentPlayer);
  });
}

// Reset the game
resetButton.addEventListener('click', resetGame);

function resetGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameActive = true;
  initializeBoard();
}

// Initialize the game on load
initializeBoard();
