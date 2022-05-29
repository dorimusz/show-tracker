const router = require('express').Router();
const User = require('../models/user');

router.post('/login', async (req, res) => {
    const user = new User({
        username: req.body.username,
        googleID: req.body.googleID //nem így!!!!
    });

    await user.save().catch((err) => console.log(err))
    return res.sendStatus(200).json(user)

    /*
    receiving google code -> get google token -> get googleID
    userID exists ? send jwt token : create user in DB and send jwt token
    */
});

module.exports = router;