const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// GET posts
router.get("/posts", async (req, res) => {
  const posts = await Post.find({ level: "Intermediate" });
  res.json(posts);
});

// POST new post
router.post("/posts", async (req, res) => {
  try {
    const { title, body, channel, author } = req.body;

    const newPost = new Post({
      title,
      body,
      channel,
      author,
      level: "Intermediate"
    });

    await newPost.save();

    res.json({ message: "Post saved" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed" });
  }
});

module.exports = router;
