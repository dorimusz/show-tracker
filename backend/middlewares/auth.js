const auth = (req, res, next) => {
    console.log("Authenticating...");
    const userID = 5;
    // const userID = null;
    //req.userID = userID; //ráaggatom a request objectre, mert ez utazik szépen tovább badum tss. - not best practice, nehogy felülírja a default API-t
    res.locals.userID = userID //ez a konvenció, ezt szoktuk követni, hogy erre pakoljuk rá, hogy ne rontsunk el esszenciális dolgokat
    next();
};

module.exports = auth;