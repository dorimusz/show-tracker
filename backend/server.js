require("dotenv").config();
const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT;
app.use(cors());;
app.use(express.json());;


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`To do app is listening on port ${port}`)
})