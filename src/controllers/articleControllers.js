const Article = require("./../models/articleModel");
const updateStats = require("../utils/updateStats");
const Stats = require("../models/statsModel");
const stats_id = "61ca156d6cc23b0570c15ec3";

exports.getAllArticle = async (req, res, next) => {
  try {
    const articles = await Article.find();
    if (articles.length > 0) {
      updateStats.updateBlogStats();
      res.status(200).json({
        status: "Success",
        Results: articles.length,
        data: { articles },
      });
    }
  } catch (error) {
    return next(
      res.status(500).json({
        error: error.message,
        message: "Error occured while getting all articles",
      })
    );
  }
};

exports.getArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (article) {
      const stats = await Stats.findById(stats_id);
      let findStats = stats.visitors.articles.find(
        (stat) => stat.title === article.title
      );
      if (!findStats) {
        stats.visitors.articles.push({
          title: article.title,
          views: 1,
        });
        await Stats.findByIdAndUpdate(stats_id, {
          visitors: {
            web: stats.visitors.web,
            blog: stats.visitors.blog,
            articles: stats.visitors.articles,
          },
        });
      } else {
        stats.visitors.articles.forEach((stat) => {
          if (stat.title === findStats.title) {
            stat.views = stat.views + 1;
          }
        });
        await Stats.findByIdAndUpdate(stats_id, {
          visitors: {
            web: stats.visitors.web,
            blog: stats.visitors.blog,
            articles: stats.visitors.articles,
          },
        });
      }
      res.status(200).json({
        status: "success",
        data: { article },
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "Article has not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Error occured while getting article",
    });
  }
};

exports.createNewArticle = async (req, res) => {
  try {
    if (!req.body.title || !req.body.content || !req.file) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }
    const newArticle = await Article.create({
      title: req.body.title,
      image: req.file.path || req.body.image,
      content: req.body.content,
    });
    res.status(201).json({
      status: "created",
      data: { newArticle },
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Error occured while creating article",
    });
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          image: req.body.image,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: { article },
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Error occured while updating article",
    });
  }
};

exports.updateArticleComment = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { comments: [req.body] } },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: { article },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "URL NOT FOUND",
    });
  }
};

exports.deleteArticleComment = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { $pop: { comments: 1 } },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: { article },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "URL NOT FOUND",
    });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      message: "Article Deleted Successful!",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Error occured while deleting article",
    });
  }
};
