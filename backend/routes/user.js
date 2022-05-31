const router = require('express').Router();
const httpModule = require('../utils/http');
const http = httpModule(); //ide jön a baseurl, mint pl a tokenendpoint legeleje
const jwt = require('jsonwebtoken')
const User = require('../models/user');

const config = {
    google: {
        client_id: "",
        client_secret: "",
        redirect_uri: "",
        token_endpoint: "",
        grant_type: "authorization_code",
        scope: ""
    },
    facebook: {
        client_id: "",  //appid ?
        client_secret: "", //appsecret ?
        redirect_uri: "",
        token_endpoint: "",
        grant_type: "authorization_code"
    }
}

router.post('/login', async (req, res) => {
    // receiving google code -> get google token -> get googleID
    // userID exists ? send jwt token : create user in DB and send jwt token

    const payload = req.body;
    if (!payload) return res.sendStatus(400);

    const code = payload.code;
    const provider = payload.provider;
    if (!code || !provider) return res.sendStatus(400) //not enough data
    if (!Object.keys(config).includes(provider)) return res.sendStatus(400) //dummy stuff sent

    //be van csomizva a utils/http-be
    const response = http.post(config[provider].token_endpoint, {
        "code": code,
        "client_id": config[provider].client_id,
        "client_secret": config[provider].client_secret,
        "redirect_uri": config[provider].redirect_uri,
        "grant_type": "authorization_code"
    })

    if (!response) return res.sendStatus(500);
    if (response.status !== 200) return res.sendStatus(401);

    //azért nem verifyoljuk, mert mi nem tudjuk. a google írta alá, nála van a secrer-key, de nyugodtan decodeolhatjuk
    const decoded = jwt.decode(response.data.id_token)
    if (!decoded) return res.sendStatus(500);

    // elmentjük a usert a googleId alapján
    const userId = decoded.sub //ezen belül van az openid
    const user = await User.find({ [`providers.${provider}`]: userId })
    /*
    const key = 'providers' + provider;
    const user = await User.find({[key]: decoded.sub})
    */
});

router.post('/logout', async (req, res) => {

})

module.exports = router;