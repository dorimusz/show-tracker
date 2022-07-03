const jwt = require('jsonwebtoken')

const auth = ({ block }) => (req, res, next) => {
    // console.log("Authenticating...");

    const token = req.header('authorization'); //ide jön majd, hgy jwt.vel verifyoljuk
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error && block) return res.sendStatus(401);
        res.locals.user = user;
        // console.log(`Authenticated user's _id: ${userId}`)
        next();
    });
}; //ez egy olyan function, ami bizonyos paraméterekkel doglozik és azon paraméterek alapján visszaad egy functiont - higher-order function

module.exports = auth;

/*
const auth = (req, res, next) => {
    console.log("Authenticating...");
    const userID = 5;
    // const userID = null;
    //req.userID = userID; //ráaggatom a request objectre, mert ez utazik szépen tovább badum tss. - not best practice, nehogy felülírja a default API-t
    res.locals.userID = userID //ez a konvenció, ezt szoktuk követni, hogy erre pakoljuk rá, hogy ne rontsunk el esszenciális dolgokat
    next();
};
*/