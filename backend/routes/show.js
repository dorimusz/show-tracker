const router = require('express').Router()
const auth = require('../middlewares/auth')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


// /api/show/:id', showRoutes)

router.get('/', auth({ block: false }), async (req, res) => {
    const token = req.headers.authorization;
    const tokenPayload = jwt.decode(token);
    // console.log(tokenPayload)
    console.log("userid: " + tokenPayload.userId)

    const user = await User.findById(tokenPayload.userId);
    console.log("user: " + user)


    return res.json({ watchlist: user.watchlist })
});

module.exports = router;