const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// GET all Advanced posts (newest first)
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find({ level: "Advanced" })
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    console.error("GET ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

//CREATE Advanced post
router.post("/posts", async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body);

    const { title, body, channel, author } = req.body;

    const newPost = new Post({
      title,
      body,
      author: author || "User",
      channel: channel?.trim() || "arrays",
      level: "Advanced"
    });

    await newPost.save();

    console.log("POST SAVED:", newPost);

    res.json(newPost);

  } catch (err) {
    console.error("POST ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


// UPVOTE (ANTI-SPAM)
router.post("/posts/:id/upvote", async (req, res) => {
  try {
    const { username } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // already upvoted
    if (post.upvotedBy.includes(username)) {
      return res.json({ message: "Already upvoted" });
    }

    //remove downvote if exists
    if (post.downvotedBy.includes(username)) {
      post.downvotedBy = post.downvotedBy.filter(u => u !== username);
      post.downvotes -= 1;
    }

    //add upvote
    post.upvotedBy.push(username);
    post.upvotes += 1;

    await post.save();

    res.json(post);

  } catch (err) {
    console.error("UPVOTE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});



// DOWNVOTE (ANTI-SPAM)
router.post("/posts/:id/downvote", async (req, res) => {
  try {
    const { username } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // already downvoted
    if (post.downvotedBy.includes(username)) {
      return res.json({ message: "Already downvoted" });
    }

    //remove upvote if exists
    if (post.upvotedBy.includes(username)) {
      post.upvotedBy = post.upvotedBy.filter(u => u !== username);
      post.upvotes -= 1;
    }

    //add downvote
    post.downvotedBy.push(username);
    post.downvotes += 1;

    await post.save();

    res.json(post);

  } catch (err) {
    console.error("DOWNVOTE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


// DELETE (ONLY AUTHOR)
router.delete("/posts/:id", async (req, res) => {
  try {
    const { username } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.author !== username) {
      return res.status(403).json({ error: "Not allowed" });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.json({ success: true });

  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
