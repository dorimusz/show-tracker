const router = require('express').Router();
const httpModule = require('../utils/http');
const http = httpModule(); //ide jön a baseurl, mint pl a tokenendpoint legeleje
const jwt = require('jsonwebtoken')
const User = require('../models/user');

const config = {
    google: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: "http://localhost:3000/callback",
        token_endpoint: "https://oauth2.googleapis.com/token",
        grant_type: "authorization_code",
        scope: ""
    },
    facebook: {
        client_id: "",  //appid ?
        client_secret: "", //appsecret ?
        redirect_uri: "",
        token_endpoint: "",
        // grant_type: "authorization_code"
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
        "scope": "openid"
        // "grant_type": "authorization_code"
    })

    if (!response) return res.sendStatus(500);
    if (response.status !== 200) return res.sendStatus(401); //amit a google ad, nem 200-as, akkor nem tudjuk azonosítani

    //azért nem verifyoljuk, mert mi nem tudjuk. a google írta alá, nála van a secrer-key, de nyugodtan decodeolhatjuk
    const decoded = jwt.decode(response.data.id_token)
    if (!decoded) return res.sendStatus(500);

    // elmentjük a usert a googleId alapján
    const userId = decoded.sub //ezen belül van az openid
    const key = `providers.${provider}`;    // const key = 'providers' + provider;
    // const user = await User.find({ [`providers.${provider}`]: userId })
    // const user = await User.find({[key]: decoded.sub})
    const user = await User.findOneAndUpdate(
        { [key]: decoded.sub },
        { "providers": { [provider]: decoded.sub } },
        { upsert: true, new: true }
    );

    const sessionToken = jwt.sign({ "userId": user._id, "providers": user.providers }, process.env.JWT_SECRET, { expiresIn: "1h" }); //ezt az id-t a mongoDB adta nekik, sevret key, expires in

    res.json(sessionToken) //visszaküldjük neki stringként, de küldhetjük objectben is {sessionToken}/{"sessionToken": sessionToken}
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