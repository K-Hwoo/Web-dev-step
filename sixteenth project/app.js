const path = require("path");

const express = require("express");
const session = require("express-session");
const mongodbStore = require("connect-mongodb-session");

const db = require("./data/database");
const demoRoutes = require("./routes/demo");

const mongoDBStore = mongodbStore(session);

const app = express();

const sessionStore = new mongoDBStore({
  uri: "mongodb://localhost:27017",
  databaseName: "auth-demo",
  collection: "sessions",
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "super-secret",
    resave: false,
    saveUninitialized: false,
    // 내부에 데이터가 없는 빈 세션은 데이터베이스에 저장되지 않으므로 세션 쿠키 생성 X
    store: sessionStore, // 세션 데이터가 실제로 저장되어야 하는 위치 제어
    cookie: {
      maxAge: 60 * 1000 * 60 * 24 * 30, // 1초   60분   24시간   30일
      // 30일 뒤 세션 만료, 이 옵션이 없으면 세션이 만료되지 않음
    },
  })
);

app.use(async function (req, res, next) {
  const user = req.session.user;
  const isAuth = req.session.isAuthenticated;

  if (!user | !isAuth) {
    return next();
  }

  const userDoc = await db
    .getDb()
    .collection("users")
    .findOne({ _id: user.id });

  const isAdmin = userDoc.isAdmin;

  res.locals.isAuth = isAuth;
  res.locals.isAdmin = isAdmin;

  next();
});

app.use(demoRoutes);

app.use(function (error, req, res, next) {
  res.render("500");
});

db.connectToDatabase().then(function () {
  app.listen(3000);
});
