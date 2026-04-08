const express = require("express");
const router = express.Router();

let posts = [];

// GET posts
router.get("/posts", (req, res) => {
  res.json(posts);
});

// POST new post
router.post("/posts", (req, res) => {
  try {
    const { title, body, channel, author } = req.body;

    const newPost = {
      title,
      body,
      channel,
      author
    };

    posts.push(newPost);

    res.status(200).json({ message: "Post added successfully" });
  } catch (error) {
    console.log("ERROR IN POST:", error);
    res.status(500).json({ error: "Failed to add post" });
  }
});

module.exports = router;
