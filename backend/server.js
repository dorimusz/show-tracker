require("dotenv").config();
const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT;

const corsOptions = {
    origin: process.env.HOST,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

//Middleware functions
const myMiddlewareFunction = (req, res, next) => {
    res.sendStatus(204); //successful response, no content -> with any kind of url, it'll give the same response 'http://localhost:4000' & 'http://localhost:4000/api/barmi'
    next();
}

const myLoggerMiddleware = (req, res, next) => {
    console.log("Logging something...");
    next();
}

const myAuthMiddleware = (req, res, next) => {
    console.log("Authenticating...");
    // const userID = 5;
    const userID = null;
    req.userID = userID; //ráaggatom a request objectre, mert ez utazik szépen tovább badum tss. - not best practice
    res.locals.userID = userID //az a konvenció, ezt szoktuk követni, hogy erre pakoljuk rá
    next();
}
const mmyBusinessLogicMiddleware = (req, res) => {
    if (!res.locals.userID) return res.sendStatus(401); //ha nincs userID, itt megakasztjuk a folyamatot
    console.log("My business logic is running");
    res.status(200).json('OK');
}

// app.use(myMiddlewareFunction)
app.use(myLoggerMiddleware);
app.use(myAuthMiddleware);
app.use(mmyBusinessLogicMiddleware);

// app.use(cors(corsOptions));;
// app.use(express.json());


// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

app.listen(port, () => {
    console.log(`To do app is listening on port ${port}`)
})