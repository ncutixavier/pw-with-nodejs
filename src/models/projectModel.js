const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A project must have a title'],
    trim: true,
    unique: true,
  },

  description: {
    type: String,
    required: [true, 'A project must have a description'],
    trim: true,
  },

  image: {
    type: String,
    required: [true, 'An project must have an image'],
  },

  languages: {
    type: String,
    required: [true, 'An project must have languages'],
  },

  link: {
    type: String,
    required: [true, 'An project must have link'],
  },

  date_created: {
    type: Date,
    required: [true, 'An project must have a date'],
  },

  date_updated: {
    type: Date,
    default: Date.now(),
    required: [true, 'An project must have a date'],
  },
});

projectSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

projectSchema.set('toJSON', {
  virtuals: true,
});

const Project = mongoose.model('Project', projectSchema)

module.exports = Project
