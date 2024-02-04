let inputElement = document.querySelector("input");
let textLengthSpan = document.getElementById("remaining-chars");

let maxAllowedChars = inputElement.maxLength; // 하드코딩을 줄이기 위해 ..

function getRemainingCharLength(event) {
  let text = event.target.value;
  // console.log(text.length);
  textLengthSpan.textContent = maxAllowedChars - text.length;
}

inputElement.addEventListener("input", getRemainingCharLength);
