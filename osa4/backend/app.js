const config = require('./utils/config')
const express = require('express')
const morgan = require('morgan');
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

morgan.token('req-body', (req) => JSON.stringify(req.body));







// const Blog = mongoose.model('Blog', blogSchema)


mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })



app.use(cors())
app.use(morgan(':method :url :status :response-time ms - :res[content-length] - :req-body'));
app.use(express.json())

app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)

app.use(middleware.errorHandler)


module.exports = app;