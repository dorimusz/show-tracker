require("dotenv").config();
const mongoose = require('mongoose');
const port = process.env.PORT;

const app = require('./app');

mongoose
    .connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false //not working
    })
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log(err));

app.listen(port, () => {
    console.log(`To do app is listening on port ${port}`)
})