const _config = {
    dev: {
        todoapi: "http://localhost:4000/api",
        google: {
            client_id: "282852055754-n7u6ebt1k06hchj071s7r7fh92t77f9r.apps.googleusercontent.com",
            base_url: "https:accounts.google.com/o/oauth2/v2/auth"
        },
        oid: {
            client_id: "mycid",
            base_url: "http://localhost:3001"
        }
    },
    prod: {
        todoapi: process.env.REACT_APP_TODOAPI || "https://localhost:4000/api",
        google: {
            client_id: process.env.REACT_APP_CLIENT_ID || "423125049963-vnhlm59vvirdjsquu0efhqvq5u91orks.apps.googleusercontent.com",
            base_url: process.env.REACT_APP_GOOGLE_BASE_URL || "https:accounts.google.com/o/oauth2/v2/auth"
        },
        oid: {
            client_id: "mycid",
            base_url: "http://localhost:3001"
        }
    }
}

const config = process.env.NODE_ENV === "development" ? _config.dev : _config.prod;
export default config;