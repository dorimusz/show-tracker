const router = require('express').Router()
const auth = require('../middlewares/auth')
const User = require('../models/user')
const ObjectId = require('mongodb').ObjectID;
//CRUD: create-read-update-delete

router.get('/', auth({ block: true }), async (req, res) => {
    // 1. needs auth middleware with block
    // 2. find user with userID from res.locals.Id
    // 3. return user.dashboards; send all dashboards connected to a user from mongoDB

    /*
    const parsedId = JSON.parse(res.locals.userId)
    const user = await User.findById({ '_id': ObjectId(parsedId) });
    res.json({ user }); // => {user: user}
    */
    const user = await User.findById(res.locals.user.userId);
    res.json({ user });
});

/* no need for these right now
router.get('/api/dashboards/:id', async (req, res) => {
    // send one specific dashboard(:id) connected to user
});

router.get('/api/dashboards/:id/todos', async (req, res) => {
    // send todos connected to a specific dashboard
});
*/

router.get('/:id/todos/:todoId', auth({ block: true }), async (req, res) => {
    // send todId of a todo connected to a specific dashboard
});

router.post('/', auth({ block: true }), async (req, res) => {
    // create dashboard for user, send created :id
    const parsedId = JSON.parse(res.locals.user.userId)
    const user = await User.findById({ '_id': ObjectId(parsedId) });

    user.dashboards.push({ title: req.body.title });   //MIÉRT NULL EZ A CSICSKAGYÁSZ és mit csináljak vele anyád user.dashboard
    await user.save().catch((err) => res.sendStatus(500).send(err));
    return res.json({ dashboards: user.dashboards })
});

router.post('/:id/todos', async (req, res) => {
    // create todo for a specific dashboard, send created :todoId
});

router.patch('/:id', async (req, res) => {
    // updating an existing dashboard
});

router.patch('/:id/todos/:todoId', async (req, res) => {
    // updating an existing todo connected to a dashboard
});

router.delete('/:id', async (req, res) => {
    //  delete dashboard
})

router.delete('/api/dashboards/:id', async (req, res) => {
    //  delete dashboard
})

module.exports = router;