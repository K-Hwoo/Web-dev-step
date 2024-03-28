const express = require("express");
const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectId;

const db = require("../data/database");

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", async function (req, res) {
  const posts = await db
    .getDb()
    .collection("posts")
    .find({}, { title: 1, summary: 1, "author.name": 1 })
    .toArray();
  res.render("posts-list", { posts: posts });
});

router.get("/posts/:pID", async function (req, res, next) {
  let postId = req.params.pID;

  try {
    postId = new ObjectId(postId);
  } catch (error) {
    // return res.status(404).render("404");
    return next(error); // app.js의 에러처리 미들웨어 호출
  }

  const post = await db.getDb().collection("posts").findOne({ _id: postId });

  if (!post) {
    return res.status(404).render("404");
  }

  const author = await db
    .getDb()
    .collection("authors")
    .findOne({}, { _id: new ObjectId(post.author.id) });

  const postData = {
    ...post,
    date: post.date.toISOString(),
    email: author.email,
    humanReadableDate: post.date.toLocaleDateString("ko", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };

  res.render("post-detail", { postData: postData });
});

router.get("/new-post", async function (req, res) {
  const authors = await db.getDb().collection("authors").find().toArray();
  res.render("create-post", { authors: authors });
});

router.post("/new-post", async function (req, res) {
  // authors에 대한 컬렉션 데이터를 수동으로 가져와서 join
  const authorID = new ObjectId(req.body.author);
  const author = await db
    .getDb()
    .collection("authors")
    .findOne({ _id: authorID });

  const newPost = {
    title: req.body.title,
    summary: req.body.summary,
    body: req.body.content,
    date: new Date(),
    author: {
      id: authorID,
      name: author.name,
    }, // posts 컬렉션의 데이터와 Join 해줌,
    // 변하지 않을 것이라 예상되는 데이터는 join 해주면 관리하기 편함
    // email은 자주 바뀔 가능성이 있기에 join 해주지 않을 것임
  };

  await db.getDb().collection("posts").insertOne(newPost);

  res.redirect("/posts");
});

router.get("/posts/:pID/edit", async function (req, res) {
  const postId = req.params.pID;
  const post = await db
    .getDb()
    .collection("posts")
    .findOne({ _id: new ObjectId(postId) });

  if (!post) {
    return res.status(404).render("404");
  }

  res.render("update-post", { post: post });
});

router.post("/posts/:pID/edit", async function (req, res) {
  const postId = req.params.pID;

  await db
    .getDb()
    .collection("posts")
    .updateOne(
      { _id: new ObjectId(postId) },
      {
        $set: {
          title: req.body.title,
          summary: req.body.summary,
          body: req.body.content,
        },
      }
    );

  res.redirect("/posts");
});

router.post("/posts/:pID/delete", async function (req, res) {
  const postId = req.params.pID;

  await db
    .getDb()
    .collection("posts")
    .deleteOne({ _id: new ObjectId(postId) });

  res.redirect("/posts");
});

module.exports = router;
