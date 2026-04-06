const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(

  {
    title: String,
    body: String,
    author: String,
    channel: {
  type: String,
  default: "arrays"
}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);