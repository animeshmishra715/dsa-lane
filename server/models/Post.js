const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: String,
  body: String,
  channel: String,
  author: String,
  level: String
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);
