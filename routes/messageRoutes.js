const express = require('express');
const messageController = require('./../controllers/messageControllers')
const router = express.Router()

router.post('/', messageController.sendEmail);

module.exports = router
