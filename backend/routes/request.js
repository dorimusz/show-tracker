const router = require('express').Router();
const auth = require('../middlewares/auth')
const Request = require('../models/request')

router.get('/', auth, async (req, res) => {

})

router.post('/', auth({ block: true }), async (req, res) => {
    // const token = req.headers.authorization;
    const payload = req.body;
    if (!payload) return res.status(400).send('Nice try');
    if (!payload.title) return res.status(400).send('Title is required');

    const request = new Request({
        title: payload.title,
        comment: payload.comment,
    })
    await request.save().catch((err) => { return res.status(500).json(err) });
    return res.status(200).json("Thank you for your request, we'll check it soon!");

});

module.exports = router;