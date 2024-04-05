const express = require("express");
const bcrypt = require("bcryptjs");

const db = require("../data/database");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("welcome");
});

router.get("/signup", function (req, res) {
  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      email: "",
      confirmEmail: "",
      password: "",
    };
  }

  req.session.inputData = null;

  res.render("signup", { inputData: sessionInputData });
});

router.get("/login", function (req, res) {
  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      email: "",
      password: "",
    };
  }

  req.session.inputData = null;

  res.render("login", { inputData: sessionInputData });
});

router.post("/signup", async function (req, res) {
  const userData = req.body;
  const enteredEmail = userData.email; // userData["email"];
  const enteredConfirmEmail = userData["confirm-email"]; // .표기법에서 dash는 사용불가
  const enteredPassword = userData.password;

  if (
    !enteredEmail ||
    !enteredConfirmEmail ||
    !enteredPassword ||
    enteredPassword.trim() < 6 ||
    enteredEmail !== enteredConfirmEmail ||
    !enteredEmail.includes("@")
  ) {
    req.session.inputData = {
      hasError: true,
      message: "Invalid input - please check yout data.",
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
    };

    req.session.save(function () {
      console.log("Incorrect data");
      return res.redirect("/signup");
    });

    return; // 서버 충돌 방지
  } // 회원 가입시 에러 처리

  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: enteredEmail });

  if (existingUser) {
    req.session.inputData = {
      hasError: true,
      message: "User exists already!",
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
    };

    req.session.save(function () {
      return res.redirect("/signup");
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(enteredPassword, 12);

  const user = {
    email: enteredEmail,
    password: hashedPassword,
  };

  await db.getDb().collection("users").insertOne(user);

  res.redirect("/login");
});

router.post("/login", async function (req, res) {
  const userData = req.body;
  const enteredEmail = userData.email; // userData["email"];
  const enteredPassword = userData.password;

  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: enteredEmail });

  if (!existingUser) {
    req.session.inputData = {
      hasError: true,
      message: "Could not log you in - please check yout credentials!",
      email: enteredEmail,
      password: enteredPassword,
    };
    req.session.save(function () {
      console.log("Could not log in!");
      return res.redirect("/login");
    });

    return;
  }

  const passwordAreEqual = await bcrypt.compare(
    enteredPassword,
    existingUser.password
  );

  if (!passwordAreEqual) {
    req.session.inputData = {
      hasError: true,
      message: "Could not log you in - please check yout credentials!",
      email: enteredEmail,
      password: enteredPassword,
    };
    req.session.save(function () {
      console.log("Could not log in! - password are not correct!");
      return res.redirect("/login");
    });

    return;
  }

  req.session.user = {
    id: existingUser._id,
    email: existingUser.email,
  };
  req.session.isAuthenticated = true;
  req.session.save(function () {
    // 인증이 필요한 페이지로의 리다이렉트를 위해
    console.log("User is authenticated!");
    res.redirect("/");
  });
});

router.get("/admin", async function (req, res) {
  // Check the user "ticket"

  if (!res.locals.isAuth) {
    // if (!req.session.isAuthenticated)
    // if (!req.session.user) -> req.session.isAuthenticated 설정 안했을 시
    // return res.status(401).render("401");
    return res.redirect("/login"); // -> 비로그인 시 로그인 페이지로 리다이렉트
  }

  if (!res.locals.isAdmin) {
    return res.status(403).render("403");
  }

  res.render("admin");
});

router.post("/logout", async function (req, res) {
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect("/");
});

module.exports = router;
