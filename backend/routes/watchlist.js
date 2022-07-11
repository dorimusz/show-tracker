const router = require('express').Router()
const auth = require('../middlewares/auth')
const User = require('../models/user')
const ObjectId = require('mongodb').ObjectID;

router.get('/', auth({ block: false }), async (req, res) => {
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
    const parsedId = JSON.parse(res.locals.user.userId) //kiszedni a useridt
    const user = await User.findById({ '_id': ObjectId(parsedId) })
});

router.delete('/', async (req, res) => {

})


router.post('/', auth({ block: true }), async (req, res) => {
    // create dashboard for user, send created :id
    const parsedId = JSON.parse(res.locals.user.userId)
    const user = await User.findById({ '_id': ObjectId(parsedId) });

    user.dashboards.push({ title: req.body.title });   //MIÉRT NULL EZ A CSICSKAGYÁSZ és mit csináljak vele anyád user.dashboard
    await user.save().catch((err) => res.sendStatus(500).send(err));
    return res.json({ dashboards: user.dashboards })
});


module.exports = router;