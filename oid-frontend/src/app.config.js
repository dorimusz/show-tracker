const _config = {
    dev: {
        oidapi: "http://localhost:8080/api",
        // oidapi: "https://localhost:4000/api",

    },
    prod: {
        oidapi: process.env.REACT_APP_OIDAPI || "http://localhost:8080/api",
    }
}

const config = process.env.NODE_ENV === "developement" ? _config.dev : _config.prod;
export default config;