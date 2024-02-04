// Exercise Time!

// 1. Select the <h1>element by "drilling into the DOM" and
//    save it in a variable with a name of your choice

console.dir(document.body);

let h1 = document.body.children[0];
console.dir(h1);

// 2. Use the variable from (1) and get access to the "parent"
//    element of the store d <h1> element (i.e. to the <body> element)
//    BONUS: Try using the variable from (1) to get access to the
//    sibling element (i.e. the <p> element next to the <h1> element)

let parent_h1 = h1.parentElement;
console.log(parent_h1);

let nextSibling_h1 = h1.nextElementSibling;
console.log(nextSibling_h1);

// 3. Select the <h1> element with getElementById and store in
//    the same or a new variable (up to you)

let h1ByID = document.getElementById("main-text");
console.log(h1ByID);

// 4. Select the second <p> element with querySelector (you might
//    need to add something in the HTMLcode, e.g. a class)
//    and store it in a new variable with a name of your choice

let secondP = document.querySelector(".paragraph");
console.log(secondP);
console.dir(secondP);

// 5. BONUS TASK: Try changing the text content of the <p> element
//    you selected in (4) and set it to any other text of your choice

// secondP.textContent = "Text is changed !!";
secondP.innerText = "Text is changed !!";
