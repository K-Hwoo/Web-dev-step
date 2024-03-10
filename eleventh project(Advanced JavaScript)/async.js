const fs = require("fs/promises");

async function readFile() {
  let fileData;

  //   fileData = fs.readFileSync("data.txt");

  //   fs.readFile("data.txt", function (error, fileData) {
  //     if (error) {
  //       // ...
  //     }
  //     console.log("File parsing done!");
  //     console.log(fileData.toString());
  //   });

  // fs.readFile("data.txt")가 프로미스를 반환
  //   fs.readFile("data.txt")
  //     .then(function (fileData) {
  //       console.log("File parsing done!");
  //       console.log(fileData.toString());
  //     })
  //     .then(function () {})
  //     .catch(function (error) {
  //       console.log(error);
  //     });

  //   console.log("Hi there!");

  try {
    fileData = await fs.readFile("data.txt");
  } catch (error) {
    console.log(error);
  }

  console.log("File parsing done!");
  console.log(fileData.toString());

  console.log("Hi there!");
}

readFile();
console.log("Which is first?");
