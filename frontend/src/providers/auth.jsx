import React, { useContext, createContext, useState } from "react";
import { useEffect } from "react";
import jwt from 'jwt-decode';
import { toDoApi } from "../api/toDoApi";
import config from "../app.config"

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const { post } = toDoApi();

    useEffect(() => {
        const tokenInStorage = localStorage.getItem("token");
        if (tokenInStorage) {
            setToken(tokenInStorage);
            setUser(jwt(tokenInStorage))
        }
    }, [])

    const auth = (provider) => {
        const baseUrl = config[provider].base_url;
        console.log(config[provider].base_url);
        const searchParams = new URLSearchParams();
        searchParams.append("client_id", config[provider].client_id);
        searchParams.append("scope", "openid");
        searchParams.append("redirect_uri", window.location.origin + "/callback/" + provider);
        searchParams.append("response_type", "code");
        searchParams.append("prompt", "select_account")

        const fullUrl = baseUrl + "?" + searchParams.toString();
        window.open(fullUrl, "_self");
    };

    const login = async (code, provider) => {
        try {
            const response = await post('/user/login', {
                "code": code,
                "provider": provider
            });

            setToken(response.data.sessionToken);
            localStorage.setItem("token", response.data.sessionToken);

            setUser(jwt(response.data.sessionToken));
            console.log(user);

        } catch (error) {
            console.log(error);
            setToken(null);
            localStorage.removeItem("token");
        }
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
        this.router.navigate(['/'])
    };

    const register = async (username) => {
        const response = await post('user/create', { username });

        if (response?.status === 200) {
            setToken(response.data.sessionToken);
            localStorage.setItem("token", response.data.sessionToken);
            setUser(jwt(response.data.sessionToken));
        }
    }

    const contextValue = { token, auth, logout, login, user, register };

    return (
        <>
            <p></p>
            <AuthContext.Provider value={contextValue}>
                {children}
            </AuthContext.Provider>
        </>
    );
};

//custom hook
const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("add AuthProvider to root");
    return context
}

// const useAuth = () => {
//     return useContext(AuthContext);
// };

export { AuthProvider, useAuth };