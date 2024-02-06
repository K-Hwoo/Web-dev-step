const inputElement = document.querySelector("input");
const textLengthSpan = document.getElementById("remaining-chars");

const maxAllowedChars = inputElement.maxLength; // 하드코딩을 줄이기 위해 ..

function getRemainingCharLength(event) {
  let text = event.target.value;
  // console.log(text.length);
  let remainingChar = maxAllowedChars - text.length;

  textLengthSpan.textContent = remainingChar;

  if (remainingChar === 0) {
    inputElement.classList.add("error");
    textLengthSpan.classList.add("error");
  } else if (remainingChar <= 10) {
    inputElement.classList.remove("error");
    inputElement.classList.add("warning");
    textLengthSpan.classList.remove("error");
    textLengthSpan.classList.add("warning");
  } else {
    inputElement.classList.remove("warning");
    textLengthSpan.classList.remove("warning");
  }
}

inputElement.addEventListener("input", getRemainingCharLength);
