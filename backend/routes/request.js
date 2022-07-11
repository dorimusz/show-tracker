const router = require('express').Router();
const auth = require('../middlewares/auth')

router.get('/', auth({ block: true }), async (req, res) => {
    //post request to database, sending back successful or failed
    // const requestedShow = new User({
    //     //code
    // });
    res.json('OK')
});

module.exports = router;