//ez egy olyan function, ami bizonyos paraméterekkel doglozoik és azon paraméterek alapján visszaad egy functiont - higher-order function
const auth = ({ block }) => (req, res, next) => {
    // console.log("Authenticating...");
    const userId = req.header('authorization'); //ide jön majd, hgy jwt.vel verifyoljuk
    res.locals.userId = userId;
    console.log(`Authernticated user's _id: ${userId}`)
    if (block && !res.locals.userId) return res.sendStatus(401);
    next();
};

/*
const auth = ({middlewareParams}) => (req, res, next) => {
    console.log("Authenticating...");
    const userID = req.header('authorization'); //ide jön majd, hgy jwt.vel verifyoljuk
    res.locals.userID = userID;
    if (middlewareParams.block && !res.locals.userID) return res.sendStatus(401);
    next();
};
*/

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