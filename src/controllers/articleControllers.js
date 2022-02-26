const Article = require("./../models/articleModel");
const updateStats = require("../utils/updateStats");
const mongooseErrorResponse = require("../utils/response.util");
const Stats = require("../models/statsModel");
const stats_id = "61ca156d6cc23b0570c15ec3";
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

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
    mongooseErrorResponse(res, error);
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
    mongooseErrorResponse(res, error);
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
    mongooseErrorResponse(res, error);
  }
};

exports.updateArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await Article.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: { article },
    });
  } catch (error) {
    mongooseErrorResponse(res, error);
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
    let img = req.article.image.split("/")
    const cloudinaryId = img[img.length - 1].split(".")[0];
    await cloudinary.uploader.destroy(cloudinaryId);
    await Article.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Article Deleted Successful!",
    });
  } catch (err) {
    console.log(err);
    mongooseErrorResponse(res, err);
  }
};
