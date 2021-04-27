// import express from 'express'
// import morgan from 'morgan'
const articleRouter = require('./routes/articleRoutes');
const projectRouter = require('./routes/projectRoutes');
const userRouter = require('./routes/userRoutes');
const express = require('express')
const morgan = require('morgan')

const app = express();
app.use(express.json()); // Make sure it comes back as json

app.use(morgan('dev'))

//get current environment
console.log(process.env.NODE_ENV)

app.use((req, res, next) => {
    req.requestedTime = new Date().toISOString
    next()
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, PATCH, POST, GET, DELETE, OPTIONS');
    next();
});


app.use('/api/v1/blogs', articleRouter)
app.use('/api/v1/projects', projectRouter)
app.use('/api/v1/users', userRouter)

module.exports = app