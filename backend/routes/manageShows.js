const router = require('express').Router()
const auth = require('../middlewares/auth')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

router.get('/manage', auth({ block: true }), async (req, res) => {
    const token = req.headers.authorization;
    const tokenPayload = jwt.decode(token);
    console.log(tokenPayload)

    console.log("userid: " + tokenPayload.userId)
    const user = await User.findById(tokenPayload.userId);

    return res.json({ watchlist: user.watchlist })
});

router.patch('/manage/ignore', auth({ block: true }), async (req, res) => {
    const payload = req.body;
    console.log(payload)
    if (!payload) return res.status(400).send('Nice try');

    const token = req.headers.authorization;
    const tokenPayload = jwt.decode(token);

    const user = await User.findById(tokenPayload.userId);
    user.watchlist = user.watchlist.map((watchlist) => watchlist.showId === payload.showid ? ignoreShow(watchlist) : watchlist)

    await user.save().catch((err) => res.sendStatus(500).send(err));
    return res.status(200).json({ watchlist: user.watchlist })
});

router.patch('/manage/unignore', auth({ block: true }), async (req, res) => {
    const payload = req.body;
    if (!payload) return res.status(400).send('Nice try');

    const token = req.headers.authorization;
    const tokenPayload = jwt.decode(token);

    const user = await User.findById(tokenPayload.userId);
    user.watchlist = user.watchlist.map((watchlist) => watchlist.showId === payload.showid ? unignoreShow(watchlist) : watchlist)

    await user.save().catch((err) => res.sendStatus(500).send(err));
    return res.status(200).json({ watchlist: user.watchlist })
});

router.delete('/manage', auth({ block: true }), async (req, res) => {
    const payload = req.body.data;
    if (!payload) return res.status(400).send('Nice try');

    const token = req.headers.authorization;
    const tokenPayload = jwt.decode(token);

    const user = await User.findById(tokenPayload.userId);
    user.watchlist = user.watchlist.map((watchlist) => watchlist.showId === payload ? deleteShow(watchlist) : watchlist)

    await user.save().catch((err) => res.sendStatus(500).send(err));
    return res.status(200).json({ watchlist: user.watchlist })
});

const ignoreShow = (watchlist) => {
    return { ...watchlist, isIgnored: true }
}

const unignoreShow = (watchlist) => {
    return { ...watchlist, isIgnored: false }
}

const deleteShow = (watchlist) => {
    return { ...watchlist, isDeleted: true, isIgnored: true, showId: "###" }
}

module.exports = router;