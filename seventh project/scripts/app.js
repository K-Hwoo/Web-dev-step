const editPlayer1Btn = document.querySelector("#edit-player-1-btn");
const editPlayer2Btn = document.querySelector("#edit-player-2-btn");
const cancleBtn = document.getElementById("cancle-button");
const errorsOutput = document.getElementById("config-errors");

const playerConfigOverlay = document.getElementById("config-overlay");
const backdrop = document.getElementById("backdrop");
const formElement = document.querySelector("form");

let editedPlayer = 0;
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

editPlayer1Btn.addEventListener("click", openEditWindow); // 함수는 config.js에
editPlayer2Btn.addEventListener("click", openEditWindow);

cancleBtn.addEventListener("click", closeEditWindow);
backdrop.addEventListener("click", closeEditWindow);

formElement.addEventListener("submit", savePlayerConfig);
