const fs = require("fs");
const path = require("path");

const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));

app.get("/", function (request, response) {
  response.send(
    "<form action='/store-user' method='POST'><label>Your Name : </label><input type='text' name='username'><button>Submit</button></form>"
  );
}); // localhost:3000/

app.get("/currenttime", function (request, response) {
  response.send("<h1>" + new Date().toISOString() + "</h1>");
}); // localhost:3000/currenttime

app.post("/store-user", function (request, response) {
  const userName = request.body.username;

  const filePath = path.join(__dirname, "data", "users.json");

  const fileData = fs.readFileSync(filePath); // 가져오는건 그냥 의미없는 텍스트 형식으로
  const existingUsers = JSON.parse(fileData);

  existingUsers.push(userName);

  // 데이터가 기록되어야 하는 파일의 위치를 파일 시스템 패키지에 알려주고 기록
  fs.writeFileSync(filePath, JSON.stringify(existingUsers));

  response.send("<h1>Username stored!</h1>");
});

app.get("/users", function (req, res) {
  const filePath = path.join(__dirname, "data", "users.json");

  const fileData = fs.readFileSync(filePath);
  const existingUsers = JSON.parse(fileData);

  let responseData = "<ul>";

  for (const user of existingUsers) {
    responseData += "<li>" + user + "</li>";
  }
  responseData += "</ul>";

  res.send(responseData);
});

app.listen(3000);
