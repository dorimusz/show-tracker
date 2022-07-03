import http from "axios"
import config from "../app.config"

export const oidApi = () => {
    const instance = http.create({
        baseURL: config.oidapi,
        timeout: 3000, //szállj ki, 
    });

    const post = async (path, data) => {
        try {
            const response = await instance.post(path, data, {});
            console.log("RESPONSE DATA:", response.data);
            return response
        } catch (error) {
            console.log('(post) error  data: ' + error.response.data);
            return error.response
        }
    }

    const get = async (path) => {
        try {
            const response = await instance.get(path, {});
            return response;
        } catch (error) {
            console.log('(get) error status: ' + error.response.status);
            console.log('(get) error data: ' + error.response.data);
            return error.response;
        }
    }
    return { post, get, _instance: instance }
}