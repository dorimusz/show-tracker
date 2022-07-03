const axios = require("axios")
// const { default: axios } = require("axios")

const http = () => {
    const instance = axios.create({
        baseURL: '',
        timeout: 3000,
    });

    const post = async (...params) => {
        try {
            const response = await instance.post(...params)
            console.log("RESPONSE DATA:", response.data);
            return response
        } catch (error) {
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
    return { post, get, _instance: instance } //privátként exportáljuk az instancet
}

module.exports = http();