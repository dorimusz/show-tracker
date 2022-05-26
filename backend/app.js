// console.log('app.js line 1 is running');
const cors = require('cors');
const express = require('express');
const app = express();

const { logger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler')
const auth = require('./middlewares/auth')

// const userRoutes = require('./routes/user');
const dashboardRoutes = require('./routes/dashboard');

app.use(cors({
    origin: process.env.HOST, //a frontend localhostja
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));;
app.use(express.json()); //bodyban érkező json parseolásáért felel
app.use(logger); //minden hívásnál automatikusan lefut ez a middleware
// app.use(auth); //de ezt nem akarom minden endpoint hívásnál meghívni, ezért elehlyezhetem másként, a (req, res) elé
// app.use(auth()); //így is használható amúgy te csicskagyász

// app.use('/api', userRoutes)
app.use('/api/dashboards', dashboardRoutes)

app.get('/api/public', (req, res) => {
    console.log('public');
    res.send('Hello world! - public');
})

app.get('/api/private', auth({ block: true }), (req, res) => {
    // console.log('app.js line 31 is running')
    console.log('private');
    res.send(`Hello world! - private ${res.locals.userID}`);
})

app.get('/api/prublic', auth({ block: false }), (req, res) => {
    console.log('pRublic');
    if (!res.locals.userID) return res.send("Hello world! - pRublic");
    res.send(`Hello world! - pRublic ${res.locals.userID}`);
})

app.use(errorHandler) //utolsóként regisztráljuk, app.get és route se legyen már utána

module.exports = app