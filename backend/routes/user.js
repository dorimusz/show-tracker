require("dotenv").config();
const router = require('express').Router();
const httpModule = require('../utils/http');
const http = httpModule(); //ide jön a baseurl, mint pl a tokenendpoint legeleje
const jwt = require('jsonwebtoken')
const User = require('../models/user');

const config = {
    google: {
        client_id: process.env.CLIENT_ID_GOOGLE,
        client_secret: process.env.CLIENT_SECRET_GOOGLE,
        redirect_uri: "http://localhost:3000/callback",
        token_endpoint: "https://oauth2.googleapis.com/token",
        grant_type: "authorization_code",
        scope: ""
    },
    github: {
        client_id: process.env.CLIENT_ID_GITHUB,
        client_secret: process.env.CLIENT_SECRET_GITHUB,
        redirect_uri: "http://localhost:3000/callback/github",
        token_endpoint: "https://github.com/login/oauth/access_token",
        grant_type: "authorization_code",
        // scope: "",
        user_endpoint: 'https://api.github.com/user'
    },
    facebook: {
        client_id: "",  //appid ?
        client_secret: "", //appsecret ?
        redirect_uri: "",
        token_endpoint: "",
        // scope: "user",
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
    const response = await http.post(config[provider].token_endpoint, {
        "code": code,
        "client_id": config[provider].client_id,
        "client_secret": config[provider].client_secret,
        "redirect_uri": config[provider].redirect_uri,
        "grant_type": config[provider].grant_type,
        // "scope": "openid"
    }, {
        headers: {
            Accept: "application/json"
        }
    })

    if (!response) return res.sendStatus(500);
    if (response.status !== 200) return res.sendStatus(401); //amit a google ad, nem 200-as, akkor nem tudjuk azonosítani

    //github oauth flowjahoz
    let openId;
    const onlyOauth = !response.data.id_token;

    if (onlyOauth) {
        // let token = response.data.split("=")[1].split("&")[0];
        let token = response.data.access_token;
        console.log(token);

        const userResponse = await http.get(config[provider].user_endpoint, {
            headers: {
                authorization: `Bearer ${token}`
                // authorization: `Bearer ${response.data.access_token}`
                // authorization: "Bearer " + response.data.access_token`
            }
        })
        if (!response) return res.sendStatus(500);
        if (response.status !== 200) return res.sendStatus(401);
        openId = userResponse.data.id;
    } else {
        //azért nem verifyoljuk, mert mi nem tudjuk. a google írta alá, nála van a secrer-key, de nyugodtan decodeolhatjuk
        const decoded = jwt.decode(response.data.id_token)
        if (!decoded) return res.sendStatus(500);
        openId = decoded.sub;
    }

    // elmentjük a usert a googleId alapján
    // const userId = decoded.sub //ezen belül van az openid
    const key = `providers.${provider}`;    // const key = 'providers' + provider;
    // const user = await User.find({ [`providers.${provider}`]: userId })
    // const user = await User.find({[key]: decoded.sub})
    /* //googlenél volt, azóta refaktorlátuk
    const user = await User.findOneAndUpdate(
        { [key]: decoded.sub },
        { "providers": { [provider]: decoded.sub } },
        { upsert: true, new: true }
    );
    */
    const user = await User.findOneAndUpdate(
        { [key]: openId },
        { "providers": { [provider]: openId } },
        { upsert: true, new: true }
    );

    const sessionToken = jwt.sign({ "userId": user._id, "providers": user.providers }, process.env.JWT_SECRET, { expiresIn: "1h" }); //ezt az id-t a mongoDB adta nekik, sevret key, expires in

    res.json({ sessionToken }) //visszaküldjük neki stringként(sessionToken), de küldhetjük objectben is ({sessionToken})/{"sessionToken": sessionToken}
    /*
    if (!user){
        User.create({
            "providers": {[provider]: decoded.sub} //létrehozunk egy usert, akinek lesz egy üres dashboard listája
        });
    }
    */

});

router.post('/logout', async (req, res) => {

})

module.exports = router;