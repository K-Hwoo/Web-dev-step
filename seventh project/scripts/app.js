const editPlayer1Btn = document.querySelector("#edit-player-1-btn");
const editPlayer2Btn = document.querySelector("#edit-player-2-btn");
const cancleBtn = document.getElementById("cancle-button");
const errorsOutput = document.getElementById("config-errors");

const playerConfigOverlay = document.getElementById("config-overlay");
const backdrop = document.getElementById("backdrop");
const formElement = document.querySelector("form");

let editedPlayer = 0;
let activePlayer = 0;
let currentRound = 1;
let gameIsOver = false;

const players = [
  {
    name: "",
    symbol: "X",
  },
  {
    name: "",
    symbol: "O",
  },
];

const startNewGameBtn = document.getElementById("start-game-btn");
const gameAreaElement = document.getElementById("active-game");
const gameFieldElements = document.querySelectorAll("#game-board li");
const activePlayerNameElement = document.getElementById("active-player-name");

const gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

const gameOverElement = document.getElementById("game-over");

editPlayer1Btn.addEventListener("click", openEditWindow); // 함수는 config.js에
editPlayer2Btn.addEventListener("click", openEditWindow);

cancleBtn.addEventListener("click", closeEditWindow);
backdrop.addEventListener("click", closeEditWindow);

formElement.addEventListener("submit", savePlayerConfig);

startNewGameBtn.addEventListener("click", startNewGame);
for (const gameFieldElement of gameFieldElements) {
  gameFieldElement.addEventListener("click", selectGameField);
}

// const gameBoardElement = document.getElementById("game-board");
// gameBoardElement.addEventListener("click", selectGameField);
// 이렇게 해도 li들을 클릭했을 때 함수가 작동
// ol에서 event target에 대한 값으로 클릭한 가장 구체적인 마지막 항목을 가져옴
