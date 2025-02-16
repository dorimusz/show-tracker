const router = require('express').Router()
const auth = require('../middlewares/auth')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

router.get('/', auth({ block: true }), async (req, res) => {
    const token = req.headers.authorization;
    const tokenPayload = jwt.decode(token);
    const user = await User.findById(tokenPayload.userId);

    return res.json({ watchlist: user.watchlist })
});

router.get('/show/:showid', auth({ block: true }), async (req, res) => {
    const token = req.headers.authorization;
    const tokenPayload = jwt.decode(token);
    const user = await User.findById(tokenPayload.userId);
    userWatchlist = user.watchlist;
    const showid = req.params.showid;

    const filteredWatchlist = userWatchlist.filter((e) => e.showId === showid);
    return res.json(filteredWatchlist[0])
});

router.post('/', auth({ block: true }), async (req, res) => {
    // if (!payload) return res.status(400).send('Nice try');
    if (Object.keys(req.body).length === 0) return res.status(400).send('Nice try');
    const payload = req.body;

    const token = req.headers.authorization;
    const tokenPayload = jwt.decode(token);

    const user = await User.findById(tokenPayload.userId);
    let conflictCheck;
    user.watchlist.map((series) => { conflictCheck = series.showId });
    if (payload.showId === conflictCheck) return res.sendStatus(409)
    user.watchlist.push(payload);
    await user.save().catch((err) => res.sendStatus(500).send(err));
    return res.status(200).json({ watchlist: user.watchlist })
});

router.patch('/', auth({ block: true }), async (req, res) => {
    const payload = req.body;
    if (Object.keys(req.body).length === 0) return res.status(400).send('Nice try');
    // if (!payload) return res.status(400).send('Nice try');

    const token = req.headers.authorization;
    const tokenPayload = jwt.decode(token);

    const user = await User.findById(tokenPayload.userId);
    user.watchlist = user.watchlist.map((watchlist) => watchlist.showId === payload.showid ? parseWatchlist(watchlist, payload.id) : watchlist)

    await user.save().catch((err) => res.sendStatus(500).send(err));
    return res.status(200).json({ watchlist: user.watchlist })
});

router.delete('/', auth({ block: true }), async (req, res) => {
    const payload = req.body.data;
    if (!payload) return res.status(400).send('Nice try');

    const token = req.headers.authorization;
    const tokenPayload = jwt.decode(token);

    const user = await User.findById(tokenPayload.userId);
    user.watchlist = user.watchlist.map((watchlist) => watchlist.showId === payload.showid ? parseWatchlistRemove(watchlist, payload.id) : watchlist)

    await user.save().catch((err) => res.sendStatus(500).send(err));
    return res.status(200).json({ watchlist: user.watchlist })
});

const parseWatchlist = (watchlist, id) => {
    return {
        ...watchlist,
        seasons: watchlist.seasons.map((season) => season.id == id ? ({ ...season, watched: true }) : season)
    }
}
const parseWatchlistRemove = (watchlist, id) => {
    return {
        ...watchlist,
        seasons: watchlist.seasons.map((season) => season.id == id ? ({ ...season, watched: false }) : season)
    }
}

module.exports = router;