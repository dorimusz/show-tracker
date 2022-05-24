require("dotenv").config();
const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT;
const { logger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler')
const auth = require('./middlewares/auth')

app.use(cors({
    origin: process.env.HOST,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));;
app.use(express.json());

//ezek mind lefutottak, minden hívásnál
app.use(logger);
app.use(auth);

app.get('/api/logic1', (req, res) => {
    console.log('logic1');
    res.send('Hello world! - 1');
})

app.get('/api/logic2', (req, res) => {
    console.log('logic2');
    res.send('Hello world! - 2');
})

app.use(errorHandler) //mivel 4 bemeneti paraméter van, tudni fogja, hogy ez error handler - de az err az első!!! és utolsóként regisztráljuk, app.get és route se legyen már utána

app.listen(port, () => {
    console.log(`To do app is listening on port ${port}`)
})