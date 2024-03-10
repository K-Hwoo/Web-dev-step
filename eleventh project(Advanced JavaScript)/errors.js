const fs = require("fs");

function readFile() {
  try {
    const fileData = fs.readFileSync("data.json"); // data.json이 없기 때문에 실패
    // try .. catch ... 구문으로 에러 발생해도 넘어가기
  } catch {
    console.log("An error occurred!");
  }
  console.log("Hi there!");
}

readFile();
