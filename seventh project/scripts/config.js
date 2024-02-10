function openEditWindow(event) {
  editedPlayer = +event.target.dataset.playerid;

  playerConfigOverlay.style.display = "block";
  backdrop.style.display = "block";
}

function closeEditWindow() {
  playerConfigOverlay.style.display = "none";
  backdrop.style.display = "none";
  formElement.firstElementChild.classList.remove("error");
  errorsOutput.textContent = "";
  formElement.firstElementChild.children[1].value = ""; // 검은 배경 눌렀을 때도 입력 초기화
}

function savePlayerConfig(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const enteredPlayerName = formData.get("username").trim(); // '       ' => ''
  // console.log(enteredPlayerName);

  if (!enteredPlayerName) {
    event.target.firstElementChild.classList.add("error");
    errorsOutput.textContent = "Please enter a valid name !!";
    return;
  }

  //   const player1Name = document.querySelector("#player-1");
  //   const player2Name = document.querySelector("#player-2");

  //   if (editedPlayer === 1) {
  //     player1Name.textContent = enteredPlayerName;
  //   } else {
  //     player2Name.textContent = enteredPlayerName;
  //   }

  const playerName = document.getElementById("player-" + editedPlayer);
  playerName.textContent = enteredPlayerName;
  players[editedPlayer - 1].name = enteredPlayerName;

  closeEditWindow();
}
