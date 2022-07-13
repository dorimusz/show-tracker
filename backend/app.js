const cors = require('cors');
const express = require('express');
require('express-async-errors');
const app = express();

const { logger } = require('./middlewares/logger');
const morgan = require("morgan");
const errorHandler = require('./middlewares/errorHandler')
const auth = require('./middlewares/auth')

app.use(cors({
    origin: process.env.HOST,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));;
app.use(express.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));

//routes:
const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes)
const watchlistRoutes = require('./routes/watchlist');
app.use('/api/watchlist', watchlistRoutes)
const manageShowsRoutes = require('./routes/manageShows');
app.use('/api/myshows', manageShowsRoutes)
const requestRoutes = require('./routes/request');
app.use('/api/request', requestRoutes)

app.use(errorHandler)

module.exports = app