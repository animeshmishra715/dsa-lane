const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// GET all posts
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE post
router.post("/posts", async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body); // 👈 IMPORTANT

    const { title, body, channel } = req.body;

    const newPost = new Post({
      title,
      body,
      author: "User",
      channel: channel?.trim() || "arrays"
    });

    await newPost.save();

    console.log("POST SAVED:", newPost); // 👈 IMPORTANT

    res.json(newPost);

  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;