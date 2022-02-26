const Article = require("../models/articleModel");

exports.checkIfArticleExist = async (req, res, next) => {
  const article = await Article.findById(req.params.id);
  if (!article) {
    return res.status(404).json({
      message: "Article has not found",
    });
  }
  next();
};
