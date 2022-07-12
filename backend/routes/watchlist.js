const router = require('express').Router()
const auth = require('../middlewares/auth')
const User = require('../models/user')
// const ObjectId = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken')

router.get('/', auth({ block: true }), async (req, res) => {
    // 1. needs auth middleware with block
    // 2. find user with userID from res.locals.Id
    // 3. return user.dashboards; send all dashboards connected to a user from mongoDB

    /*
    const parsedId = JSON.parse(res.locals.userId)
    const user = await User.findById({ '_id': ObjectId(parsedId) });
    res.json({ user }); // => {user: user}
    */
    res.json('OK')
    const user = await User.findById(res.locals.user.userId);
    res.json({ user });
});

router.post('/', auth({ block: true }), async (req, res) => {
    const payload = req.body;
    if (!payload) return res.status(400).send('Nice try');

    const token = req.headers.authorization;
    const tokenPayload = jwt.decode(token);
    console.log(tokenPayload)

    const user = await User.findById(tokenPayload.userId);

    user.watchlist.push(payload);
    await user.save().catch((err) => res.sendStatus(500).send(err));
    return res.json({ watchlist: user.watchlist })


});

router.delete('/', async (req, res) => {

})




module.exports = router;