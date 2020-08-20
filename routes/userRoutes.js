const express = require('express');
const authController = require('./../controllers/authControllers')
const userController = require('./../controllers/userControllers')
const router = express.Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)

router
  .route('/')
  .get(userController.getAllUsers)
//   .post(userController.createNewArticle)

// router
//   .route('/:id')
//   .get(articleController.getArticle)
//   .patch(articleController.updateArticle)
//   .delete(articleController.deleteArticle)

module.exports = router
