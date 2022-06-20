const config = {
    auth:
    {
        google: {
            client_id: process.env.CLIENT_ID_GOOGLE || '353860181683-522o5lhem6l71gh24mrmg1itm7rv6qv0.apps.googleusercontent.com',
            client_secret: process.env.CLIENT_SECRET_GOOGLE || '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',
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
}

module.exports = config;