// console.log(document); // window.document
// console.dir(document);

// document.body.children[1].children[0].href = "https://google.com";

let anchorElement = document.getElementById("external-link");
anchorElement.href = "https://google.com";

anchorElement = document.querySelector("#external-link");
anchorElement.href = "https://naver.com";

// Add An Element
// 1. Create the new element.

let newAnchorElement = document.createElement("a");
newAnchorElement.href = "https://google.com";
newAnchorElement.textContent = "This leads to Google!";

// 2. Get access to the parent element that should hold the new element.

let firstParagraph = document.querySelector("p");

// 3. Insert the new element into parent element content.

firstParagraph.appendChild(newAnchorElement);

// Remove Elements
// 1. Select the element that should be removed.

let firstH1Element = document.querySelector("h1");

// 2. Remove it!

firstH1Element.remove(); // 매우 구식 브라우저에서는 작동안함
// firstH1Element.parentElement.removeChild(firstH1Element);

// Move Elements

firstParagraph.parentElement.appendChild(firstParagraph);

console.log(firstParagraph.innerHTML);
console.log(firstParagraph.innerText);
