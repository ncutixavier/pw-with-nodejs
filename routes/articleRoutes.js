const express = require('express');
const articleController = require('./../controllers/articleControllers')
const authController = require('./../controllers/authControllers')
const router = express.Router()

router
  .route('/')
  .get(articleController.getAllArticle)
  .post(authController.protect, articleController.createNewArticle)

router
  .route('/:id')
  .get(articleController.getArticle)
  .patch(authController.protect, articleController.updateArticle)
  .delete(authController.protect, articleController.deleteArticle)


module.exports = router
