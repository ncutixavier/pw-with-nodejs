const express = require('express');
const statsController = require('./../controllers/statsControllers');
const authController = require('./../controllers/authControllers');
const router = express.Router();

router
  .route('/')
//   .post(statsController.createStats)
  .get(authController.protect,  statsController.getAllStats);

module.exports = router;
