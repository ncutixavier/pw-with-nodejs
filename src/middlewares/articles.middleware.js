const Article = require("../models/articleModel");
const mongooseErrorResponse = require("../utils/response.util");

exports.checkIfArticleExist = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({
        message: "Article has not found",
      });
    }
    req.article = article;
    next();
  } catch (error) {
    mongooseErrorResponse(res, error);
  }
};
