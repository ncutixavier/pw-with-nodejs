const express = require('express');
const projectController = require('../controllers/projectControllers')
const multer = require('multer')
const router = express.Router()

const storage = multer.diskStorage({
    //destination for files
    destination: function (request, file, callback) {
        callback(null, './public/images');
    },

    //add back the extension
    filename: function (request, file, callback) {
        callback(null, Date.now() + file.originalname)
    },
})

//upload parameters for multer
const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 3,
    },
});

router
    .route('/')
    .get(projectController.getAllProject)
    .post(upload.single('image'), projectController.createNewProject)

router
    .route('/:id')
    // .delete(projectController.deleteProject)
    .get(projectController.deleteProject)
    .put(upload.single('image'), projectController.updateProject)

module.exports = router
