const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const morgan = require("morgan");
const errorHandler = require('./middlewares/errorHandler')


app.use(cors({
    origin: process.env.HOST, //a frontend localhostja
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));;
app.use(express.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms")); // use this middleware on every request, logger

const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes)

const clientRoutes = require('./routes/client');
app.use('/api/client', clientRoutes)

app.use(errorHandler) //utolsóként regisztráljuk, app.get és route se legyen már utána

module.exports = app