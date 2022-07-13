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


module.exports = router;