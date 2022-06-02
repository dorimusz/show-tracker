const { default: axios } = require("axios")

const http = (baseurl) => {
    const instance = axios.create({
        baseURL: baseurl || '', //'https://some-domain.com/api/'
        timeout: 3000, //szállj ki, 
    });

    const post = async (url, body) => {
        try {
            const response = await instance.post(url, body) //ez z axios instanceit hozza magával
            return response
        } catch (error) {
            console.log(error.response)
            return error.response
        }
    }
    return { post }
}

module.exports = http;