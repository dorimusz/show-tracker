const { default: axios } = require("axios")

const http = (baseurl) => {
    const instance = axios.create({
        baseURL: baseurl || '', //'https://some-domain.com/api/'
        timeout: 3000, //szállj ki, 
    });

    const post = (url, body) => {
        try {
            const response = instance.post(url, body) //ez z axios instanceait hozza magával
            return response
        } catch (error) {
            return error.response
        }
    }
    return { post }
}

module.exports = http;