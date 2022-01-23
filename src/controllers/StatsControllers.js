const stats = require('../models/statsModel');
const Project = require('../models/projectModel');
const Article = require('../models/articleModel');

exports.createStats = async (req, res) => {
  try {
    const newStats = await stats.create({
      total_projects: req.body.total_projects,
      total_articles: req.body.total_articles,
      visitors: req.body.visitors,
      created_date: Date.now(),
    });
    res.status(201).json({
      status: 'success',
      message: 'Stats has been added successful!',
      stats: newStats,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getAllStats = async (req, res, next) => { 
  try {
    const getAllStats = await stats.find().sort({ created_date: 'desc' }).exec();
    const projects = await Project.find();
    const articles = await Article.find();
    res.status(200).json({
      status: 'success',
      total_articles: articles.length,
      total_projects: projects.length,
      stats: getAllStats[0]
    });
  } catch (error) {
    return next(
      res.status(500).json({
        status: 'fail',
        message: error.message,
      })
    );
  }
}
