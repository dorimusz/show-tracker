const router = require('express').Router();
const User = require('../models/user');
const Client = require('../models/client');

router.post('/signup', async (req, res) => {
    if (!req.body?.username || !req.body.password) return res.sendStatus(400);

    const users = await User.find({ username: req.body.username });
    if (users.length) return res.sendStatus(409);

    await User.create({
        username: req.body.username,
        password: req.body.password //hash password
    });

    res.sendStatus(200);
});

router.post('/login', async (req, res) => {
    if (!req.body?.username || !req.body.password || !req.body.client || !req.body.redirectUri) return res.sendStatus(400);

    const users = await User.find({ username: req.body.username, password: req.body.password }); //hash
    if (!users.length) return res.sendStatus(401)

    const client = await Client.findOne({ client_id: req.body.client });

    if (!client) return res.sendStatus(401);
    if (client.redirect_uri !== req.body.redirectUri) return res.sendStatus(401);

    const code = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

    client.users.push({
        userId: users[0]._id,
        code: code
    })

    await client.save();

    res.json({ code })
});

module.exports = router;