const router = require('express').Router()

router.post('/api/login', async (req, res) => {
    /*
    receiving google code -> get google token -> get googleID
    userID exists ? send jwt token : create user in DB and send jwt token
    */
});