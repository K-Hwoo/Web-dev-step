let paragraphElement = document.querySelector("p");
let inputElement = document.querySelector("input");

function changeParagraphText(event) {
  paragraphElement.textContent = "Clicked!";
  console.log(event);
}

function getInput(event) {
  //   let enterdText = inputElement.value;
  let enterdText = event.target.value;

  console.log(enterdText);
  console.log(event);
}

paragraphElement.addEventListener("click", changeParagraphText);
inputElement.addEventListener("input", getInput);
