require("dotenv").config();
const router = require('express').Router();
const httpModule = require('../utils/http');
const http = httpModule(); //ide jön a baseurl, mint pl a tokenendpoint legeleje
const jwt = require('jsonwebtoken')
const User = require('../models/user');
const auth = require('../middlewares/auth')

const config = {
    google: {
        client_id: process.env.CLIENT_ID_GOOGLE,
        client_secret: process.env.CLIENT_SECRET_GOOGLE,
        redirect_uri: "http://localhost:3000/callback",
        token_endpoint: "https://oauth2.googleapis.com/token",
        grant_type: "authorization_code",
        user_endpoint: null,
        user_id: null,
    },
    github: {
        client_id: process.env.CLIENT_ID_GITHUB,
        client_secret: process.env.CLIENT_SECRET_GITHUB,
        redirect_uri: "http://localhost:3000/callback/github",
        token_endpoint: "https://github.com/login/oauth/access_token",
        grant_type: "authorization_code",
        user_endpoint: 'https://api.github.com/user',
        user_id: "id",
    },
}

router.post('/login', auth({ block: false }), async (req, res) => {
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
        let accesstoken = response.data.access_token;
        console.log(accesstoken);

        const userResponse = await http.get(config[provider].user_endpoint, {
            headers: {
                authorization: "Bearer " + accesstoken,
            }
        })
        if (!response) return res.sendStatus(500);
        if (response.status !== 200) return res.sendStatus(401);

        const id = config[provider].user_id;
        openId = userResponse.data[id];
        // openId = userResponse.data.id;
    } else {
        const decoded = jwt.decode(response.data.id_token)
        if (!decoded) return res.sendStatus(500);
        openId = decoded.sub;
    }

    // elmentjük a usert a googleId/openid alapján, 
    const key = `providers.${provider}`;
    let user = await User.findOne(
        { [key]: openId },
    );

    if (user && res.locals.user?.providers) {
        user.providers = { ...user.providers, ...res.locals.user.providers };

        user = await user.save();
    }

    /*
    //account merge előtt
    let user = await User.findOneAndUpdate(
        { [key]: openId },
        { "providers": { [provider]: openId } },
        { upsert: true, new: true }
    );
    */
    /*
    const user = {username: "random", profile: {
        id: "randomstring",
        account: {
            balance: "..",
            id: ".."
        }
    }}
    const b1 = (user && user.profile && user.profile.account) ? user.profile.account.balance : null //a b1 értéke balance vagy semmi
    const b1 = user?.profile?.account?.balance
    */

    //optional chaining user?. = user ? user._id : null
    const sessionToken = jwt.sign({ "userId": user?._id, "providers": user ? user.providers : { [provider]: openId } }, process.env.JWT_SECRET, { expiresIn: "1h" }); //ezt az id-t a mongoDB adta nekik, secret key, expires in

    res.json({ sessionToken }) //visszaküldjük neki stringként(sessionToken), de küldhetjük objectben is ({sessionToken})/{"sessionToken": sessionToken}
});

//user létrehozása
router.post('/create', auth({ block: true }), async (req, res) => {
    // res.locals.user elérhető itt
    if (!req.body?.username) return res.sendStatus(400);
    const user = await User.create({ username: req.body.username, providers: res.locals.user.providers });

    const sessionToken = jwt.sign({ "userId": user._id, "providers": user.providers }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ sessionToken });
});


module.exports = router;