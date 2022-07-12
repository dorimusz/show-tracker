const router = require('express').Router()
const auth = require('../middlewares/auth')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

router.get('/', auth({ block: true }), async (req, res) => {
    const token = req.headers.authorization;
    const tokenPayload = jwt.decode(token);
    console.log(tokenPayload)

    const user = await User.findById(tokenPayload.userId);
    return res.json({ watchlist: user.watchlist })
});

router.post('/', auth({ block: true }), async (req, res) => {
    const payload = req.body;
    if (!payload) return res.status(400).send('Nice try');

    const token = req.headers.authorization;
    const tokenPayload = jwt.decode(token);

    const user = await User.findById(tokenPayload.userId);
    // console.log(user.watchlist)
    let conflictCheck;
    user.watchlist.map((series) => { conflictCheck = series.showId });
    if (payload.showId === conflictCheck) return res.sendStatus(409)
    user.watchlist.push(payload);
    await user.save().catch((err) => res.sendStatus(500).send(err));
    return res.status(200).json({ watchlist: user.watchlist })
});

router.delete('/', async (req, res) => {

})


module.exports = router;