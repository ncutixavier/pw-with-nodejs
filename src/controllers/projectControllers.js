const Project = require('./../models/projectModel');
const updateStats = require('../utils/updateStats');
const fs = require('fs');

//create new project
exports.createNewProject = async (req, res) => {
  try {
    const newProject = await Project.create({
      title: req.body.title,
      description: req.body.description,
      languages: req.body.languages,
      link: req.body.link,
      image: req.body.image || req.file.filename,
      date_created: Date.now(),
    });

    res.status(201).json({
      status: 'success',
      message: 'Project has been added successful!',
      project: newProject,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getAllProject = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ date_created: 'desc' }).exec();
    if (projects.length > 0) {
      updateStats.updateWebStats();
      res.status(200).json({
        status: 'success',
        Results: projects.length,
        projects: projects,
      });
    }
  } catch (error) {
    return next(
      res.status(404).json({
        status: 'fail',
        message: error.message,
      })
    );
  }
};

//update project
exports.updateProject = async (req, res) => {
  try {
    const project = {
      title: req.body.title,
      description: req.body.description,
      languages: req.body.languages,
      link: req.body.link,
      image: req.body.image || req.file.filename,
    };
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      project,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'success',
      message: 'Project has been updated successful!',
      project: updatedProject,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

//delete project
exports.deleteProject = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(200).json({
        status: 'fail',
        message: 'Project not found!',
      });
    } else {
      const project = await Project.findById(req.params.id);
      await Project.findByIdAndDelete(req.params.id);
      fs.unlinkSync('./public/images/' + project.image);

      res.status(200).json({
        status: 'success',
        message: 'Project Deleted Successful!',
      });
    }
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'URL NOT FOUND',
    });
    console.log(err);
  }
};
