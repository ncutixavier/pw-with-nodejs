const express = require('express');
const authController = require('../controllers/authControllers');
const statsControllers = require("../controllers/statsControllers");
const router = express.Router();

router
  .route('/')
  //   .post(statsController.createStats)
  .get(authController.protect, statsControllers.getAllStats);

module.exports = router;
