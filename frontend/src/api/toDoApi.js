import http from "axios"
import config from '../app.config'

export const toDoApi = () => {
    const instance = http.create({
        baseURL: config.todoapi,
        timeout: 3000,
    });

    const post = async (path, data) => {
        try {
            const response = await instance.post(path, data, {
                headers: {
                    "authorization": localStorage.getItem("token")
                }
            })
            console.log("RESPONSE DATA:", response.data);
            return response
        } catch (error) {
            console.log('(post) error  data: ' + error.response.data);
            return error.response
        }
    }

    const get = async (path) => {
        try {
            const response = await instance.get(path, {
                headers: {
                    "authorization": localStorage.getItem("token")
                }
            });
            return response;
        } catch (error) {
            console.log('(get) error status: ' + error.response.status);
            console.log('(get) error data: ' + error.response.data);
            return error.response;
        }
    }
    return { post, get, _instance: instance }

}

