const jwt = require('jsonwebtoken')

const auth = ({ block }) => (req, res, next) => {
    const token = req.header('authorization'); //ide jön majd, hgy jwt.vel verifyoljuk
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error && block) return res.sendStatus(401);
        res.locals.user = user;
        // console.log(`Authenticated user's _id: ${userId}`)
        next();
    });
};

module.exports = auth;