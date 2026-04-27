const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: String,
  body: String,
  channel: String,
  author: String,
  level: String,

  //Voting system
  upvotes: {
    type: Number,
    default: 0
  },
  downvotes: {
    type: Number,
    default: 0
  },

  //Prevent spam voting
  upvotedBy: {
    type: [String],
    default: []
  },
  downvotedBy: {
    type: [String],
    default: []
  }

}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);
