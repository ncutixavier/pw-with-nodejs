const express = require('express');
const articleController = require('./../controllers/articleControllers')
const authController = require('./../controllers/authControllers')
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const router = express.Router()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ARTICLES",
  },
});

const uploadImage = multer({ storage: storage });

router.patch('/comment/:id', articleController.updateArticleComment)
router.patch('/deleteComment/:id', articleController.deleteArticleComment)

router
  .route("/")
  .get(articleController.getAllArticle)
  .post(
    authController.protect,
    uploadImage.single("image"),
    articleController.createNewArticle
  );

router
  .route('/:id')
  .get(articleController.getArticle)
  .patch(authController.protect, articleController.updateArticle)
  .delete(
    authController.protect,
    articleController.deleteArticle
  )


module.exports = router
