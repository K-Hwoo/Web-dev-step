const express = require("express");
const db = require("../data/database");

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", async function (req, res) {
  const query = `
  SELECT posts.*, authors.name AS author_name FROM posts 
  INNER JOIN authors ON authors.id = posts.author_id
  `;
  const [posts] = await db.query(query);
  res.render("posts-list", { posts: posts });
});

router.get("/new-post", async function (req, res) {
  const [authors] = await db.query("SELECT * FROM authors"); // 즉시 완료되지 않음 - 비동기 작업
  res.render("create-post", { authors: authors });
});

router.post("/posts", async function (req, res) {
  const data = [
    req.body.title,
    req.body.summary,
    req.body.content,
    req.body.author,
  ];
  await db.query(
    "INSERT INTO posts (title, summary, body, author_id) VALUE (?)",
    [data] // 베열에 추가한 값들로 ? 를 순서대로 채움
    // = (?, ?, ?, ?) [...data]
  );
  // mysql2 패키지의 기능

  res.redirect("/posts");
});

router.get("/posts/:pID", async function (req, res) {
  const postID = req.params.pID;
  const query = `
    SELECT posts.*, authors.name AS author_name, authors.email AS author_email FROM posts 
    INNER JOIN authors ON authors.id = posts.author_id
    WHERE posts.id = (?)
  `;

  const [post] = await db.query(query, [postID]);

  if (!post || post.length === 0) {
    return res.status(404).render("404");
  }

  const postData = {
    ...post[0],
    date: post[0].date.toISOString(),
    humanReadableDate: post[0].date.toLocaleDateString("ko", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
  res.render("post-detail", { post: postData });
});

router.get("/posts/:pID/edit", async function (req, res) {
  const query = `
    SELECT * FROM posts WHERE id = (?)
  `;
  const [post] = await db.query(query, [req.params.pID]);

  if (!post || post.length === 0) {
    return res.status(404).render("404");
  }

  res.render("update-post", { post: post[0] });
});

router.post("/posts/:pID/edit", async function (req, res) {
  const data = [
    req.body.title,
    req.body.summary,
    req.body.content,
    req.params.pID,
  ];

  const query = `
    UPDATE posts SET title = ?, summary = ?, body = ?
    WHERE id = ?
  `;

  await db.query(query, [...data]);

  res.redirect("/posts");
});

router.post("/posts/:pID/delete", async function (req, res) {
  await db.query("Delete FROM posts WHERE id = ?", [req.params.pID]);
  res.redirect("/posts");
});

module.exports = router;
