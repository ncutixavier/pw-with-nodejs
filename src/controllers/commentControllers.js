const Comment = require("../models/commentModel");
const mongooseErrorResponse = require("../utils/response.util");

exports.addComment = async (req, res) => {
  try {
    const comment = await Comment.create({
      name: req.body.name,
      comment: req.body.comment,
      article: req.params.id,
    });
    res.status(201).json({ comment });
  } catch (error) {
    mongooseErrorResponse(res, error);
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ article: req.params.id });
    res.status(200).json({ comments });
  } catch (error) {
    mongooseErrorResponse(res, error);
  }
};

exports.deleteArticleComments = async (req, res) => {
  try {
    const { comments } = req.body;
    comments.forEach(async (comment) => {
      await Comment.findByIdAndDelete(comment);
    });
    res.status(200).json({
      message: "comments deleted successfully",
    });
  } catch (error) {
    mongooseErrorResponse(res, error);
  }
};
