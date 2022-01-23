const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'An article must have a title'],
        trim:true,
        unique: true
    },

    author: {
        type: String,
        default: 'Ncuti Xavier'
    },

    content: {
        type: String,
        required: [true, 'An article must have a content'],
        trim:true
    },

    image: {
        type: String,
        required: [true, 'An article must have an image']
    },

    date: {
        type: Date,
        default: Date.now(),
        required: [true, 'An article must have a date']
    },

    comments: []
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article