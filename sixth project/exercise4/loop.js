const calculateSumBtn = document.querySelector("#calculator button");

function calculateSum() {
  const userDataElement = document.getElementById("user-number");
  const calculatedSumElement = document.getElementById("calculated-sum");
  const userData = userDataElement.value;
  let sum = 0;

  for (let i = 0; i <= userData; i++) {
    sum += i;
  }

  calculatedSumElement.textContent = sum;
  calculatedSumElement.style.display = "block";
}

calculateSumBtn.addEventListener("click", calculateSum);

// -------------------------------------------------------------------------------

const highlightBtn = document.querySelector("#highlight-links button");

function highlightLinks() {
  const anchorElements = document.querySelectorAll("#highlight-links a");

  for (const anchorElement of anchorElements) {
    anchorElement.classList.add("highlight");
  }
}

highlightBtn.addEventListener("click", highlightLinks);

// -------------------------------------------------------------------------------

let userData = {
  name: "Hyunwoo Kim",
  job: "student",
  age: "26",
};

const displayBtn = document.querySelector("#user-data button");

function displayUserData() {
  const userDataList = document.querySelector("#user-data ul");

  userDataList.innerHTML = "";

  for (const data in userData) {
    const userDataListItem = document.createElement("li");
    const text = data.toUpperCase() + " : " + userData[data];
    userDataListItem.textContent = text;
    userDataList.appendChild(userDataListItem);
  }
}

displayBtn.addEventListener("click", displayUserData);

// -------------------------------------------------------------------------------

const rollDiceBtn = document.querySelector("#statistics button");

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function deriveNumberOfDiceRolls() {
  const targetNumberInput = document.getElementById("user-target-number");
  const diceRollsListElement = document.getElementById("dice-rolls");
  const targetNumber = targetNumberInput.value;

  diceRollsListElement.innerHTML = "";

  let hasRolledTargetNumber = false;
  let numberOfRolls = 0;

  while (!hasRolledTargetNumber) {
    let rolledNumber = rollDice();

    numberOfRolls++;
    const newRollListItemElement = document.createElement("li");
    const outputText = "Roll " + numberOfRolls + " : " + rolledNumber;
    newRollListItemElement.textContent = outputText;
    diceRollsListElement.appendChild(newRollListItemElement);

    // if (rolledNumber == targetNumber) {
    //   hasRolledTargetNumber = true;
    // }
    hasRolledTargetNumber = rolledNumber == targetNumber;
  }

  const outputTotalRollsElement = document.querySelector("#output-total-rolls");
  const outputTargetNumberElement = document.querySelector(
    "#output-target-number"
  );

  outputTotalRollsElement.textContent = numberOfRolls;
  outputTargetNumberElement.textContent = targetNumber;
}

rollDiceBtn.addEventListener("click", deriveNumberOfDiceRolls);
