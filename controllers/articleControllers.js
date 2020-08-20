const Article = require('./../models/articleModel');

exports.getAllArticle = async (req, res, next) => {
  try {
    const articles = await Article.find();
    res.status(200).json({
      status: "Success",
      Results: articles.length,
      data: { articles }
    })
  } catch (error) {
    return next(
      res.status(404).json({
        status: 'fail',
        message: "URL NOT FOUND..."
      })
    )
  }
}

exports.getArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: { article }
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: "URL NOT FOUND"
    })
  }
};

exports.createNewArticle = async (req, res) => {
  try {
    const newArticle = await Article.create({
      title: req.body.title,
      image: req.body.image,
      content: req.body.content
    });
    res.status(201).json({
      status: 'success',
      data: { newArticle }
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: "URL NOT FOUND"
    })
  }
}

exports.updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    res.status(200).json({
      status: 'success',
      data: { article }
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: "URL NOT FOUND"
    })
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      message: "Article Deleted Successful!"
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: "URL NOT FOUND"
    })
    console.log(err)
  }
};
