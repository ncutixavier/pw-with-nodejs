const express = require('express');
const statsControllers = require("../controllers/statsControllers");
const authController = require('../controllers/authControllers');
const router = express.Router();

router
  .route('/')
  //   .post(statsController.createStats)
  .get(authController.protect, statsControllers.getAllStats);

module.exports = router;
