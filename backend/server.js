require("dotenv").config();
const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT;

const corsOptions = {
    origin: process.env.HOST,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));;
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`To do app is listening on port ${port}`)
})