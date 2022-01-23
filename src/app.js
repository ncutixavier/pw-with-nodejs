// import express from 'express'
// import morgan from 'morgan'
const articleRouter = require('./routes/articleRoutes');
const projectRouter = require('./routes/projectRoutes');
const userRouter = require('./routes/userRoutes');
const statsRouter = require('./routes/statsRoutes');
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const app = express();
app.use(express.json()); // Make sure it comes back as json
app.use(cors());
app.use(morgan('dev'))

//get current environment
console.log(process.env.NODE_ENV)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use((req, res, next) => {
    req.requestedTime = new Date().toISOString
    next()
})

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the API',
  });
});

app.use('/api/v1/blogs', articleRouter)
app.use('/api/v1/projects', projectRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/stats', statsRouter)

app.use(express.static('public'));

module.exports = app