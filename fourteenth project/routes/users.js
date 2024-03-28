const express = require("express");
const multer = require("multer");

const db = require("../data/database");

const storageConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images"); // error, 파일을 저장하려는 폴더 경로
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // error, 저장 파일 이름
  },
});

const upload = multer({ storage: storageConfig });

const router = express.Router();

router.get("/", async function (req, res) {
  const users = await db.getDb().collection("users").find().toArray();
  res.render("profiles", { users: users });
});

router.get("/new-user", function (req, res) {
  res.render("new-user");
});

router.post("/profiles", upload.single("image"), async function (req, res) {
  const uploadedImageFile = req.file; // 파일 경로에 대한 정보를 얻을 수 있음
  const userData = req.body;

  // console.log(uploadedImageFile);
  // console.log(userData);

  await db
    .getDb()
    .collection("users")
    .insertOne({ name: userData.username, imagePath: uploadedImageFile.path });

  res.redirect("/");
});

module.exports = router;
