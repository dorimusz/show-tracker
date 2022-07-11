const config = {
    auth:
    {
        google: {
            client_id: process.env.GOOGLE_CLIENT_ID || '282852055754-n7u6ebt1k06hchj071s7r7fh92t77f9r.apps.googleusercontent.com',
            client_secret: process.env.GOOGLE_CLIENT_SECRET || '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',
            redirect_uri: "http://localhost:3000/callback/google",
            token_endpoint: "https://oauth2.googleapis.com/token",
            grant_type: "authorization_code",
            user_endpoint: null,
            user_id: null,
            scope: "openid"
        },

        oid: {
            client_id: process.env.OID_CLIENT_ID || 'mycid',
            client_secret: process.env.OID_CLIENT_SECRET || 'mycsecret',
            redirect_uri: process.env.OID_REDIRECT_UTI || "http://localhost:3001/callback/oid",
            token_endpoint: "http://localhost:8080/api/user/token",
            grant_type: "authorization_code",
            user_endpoint: null,
            user_id: null,
            scope: "openid",
        },

        github: {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            redirect_uri: "http://localhost:3000/callback/github",
            token_endpoint: "https://github.com/login/oauth/access_token",
            grant_type: "authorization_code",
            user_endpoint: 'https://api.github.com/user',
            user_id: "id",
            scope: "user",
        },
    }
}

module.exports = config;