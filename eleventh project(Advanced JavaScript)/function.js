function greetUser(userName = "Hyunwoo") {
  console.log(`Hi ${userName}!`);
}

greetUser();
greetUser("Kkami");

//
function sumUp(...numbers) {
  let result = 0;

  for (const number of numbers) {
    result += number;
  }

  return result;
}

//console.log(sumUp(1, 5, 10, 11, 20, 31));
const inputNumbers = [1, 5, 10, 11, 20, 31];
console.log(sumUp(...inputNumbers));

console.log(sumUp);
