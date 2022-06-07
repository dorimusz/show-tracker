const { default: axios } = require("axios")

const http = (baseurl) => {
    const instance = axios.create({
        baseURL: baseurl || '', //'https://some-domain.com/api/'
        timeout: 3000, //szállj ki, 
    });

    // url, body +options helyett a ...params is mehetne
    const post = async (...params) => {
        try {
            const response = await instance.post(...params) //ez z axios instanceit hozza magával
            console.log("BODY: ", response.data);
            return response
        } catch (error) {
            console.log('(post) error resp: ' + error.response);
            console.log('(post) error status: ' + error.response.status);
            console.log('(post) error  data: ' + error.response.data);
            return error.response
        }
    }

    const get = async (...params) => {
        try {
            const response = await instance.get(...params);
            return response;
        } catch (error) {
            console.log('(get) error status: ' + error.response.status);
            console.log('(get) error data: ' + error.response.data);
            return error.response;
        }
    }
    return { post, get }
}

module.exports = http;