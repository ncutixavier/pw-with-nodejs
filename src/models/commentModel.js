const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A comment must have a name"],
  },

  comment: {
    type: String,
    required: [true, "A comment must have a comment"],
  },

  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article",
  },

  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
