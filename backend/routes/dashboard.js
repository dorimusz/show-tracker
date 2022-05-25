const router = require('express').Router()
const auth = require('../middlewares/auth')
const User = require('../models/user')
//CRUD: create-read-update-delete

router.get('/api/dashboards', auth({ block: true }), async (req, res) => {
    // 1. needs auth middleware with block
    // 2. find user with userID from res.locals.Id
    // 3. return user.dashboards; send all dashboards connected to a user from mongoDB
    const user = User.findById(res.locals.userId);
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

router.get('/api/dashboards/:id/todos/:todoId', async (req, res) => {
    // send todId of a todo connected to a specific dashboard
});

router.post('/api/dashboards', async (req, res) => {
    // create dashboard for user, send created :id
});

router.post('/api/dashboards/:id/todos', async (req, res) => {
    // create todo for a specific dashboard, send created :todoId
});

router.patch('/api/dashboards/:id', async (req, res) => {
    // updating an existing dashboard
});

router.patch('/api/dashboards/:id/todos/:todoId', async (req, res) => {
    // updating an existing todo connected to a dashboard
});

router.delete('/api/dashboards/:id', async (req, res) => {
    //  delete dashboard
})

router.delete('/api/dashboards/:id', async (req, res) => {
    //  delete dashboard
})

