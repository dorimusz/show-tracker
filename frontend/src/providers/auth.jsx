import React, { useContext, createContext, useState } from "react";
import http from 'axios'
import { useEffect } from "react";
import jwt from 'jwt-decode';
import { toDoApi } from "../api/toDoApi";
//milyen értéket és metodokat cipelnénk körbe az alkalmazáson - mi fog ide ide kerülni? token
//ez itt egy react komponenes, de nem tudjuk itt használni a navigatet, mert kívül van az index.js-en, mert az authproviderben van benne a router! de itt megszerezzük az userId-t

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const { post } = toDoApi();

    //ha valaki ráfrissít, újra beállítjuk a statejeinket, nem lenne különben bejelentkezve. frissítésnél minden újrakezdődik
    useEffect(() => {
        const tokenInStorage = localStorage.getItem("token");
        if (tokenInStorage) {
            setToken(tokenInStorage);
            setUser(jwt(tokenInStorage)) //nem a useStateből hanem a storageből jön a token
        }
    }, [])


    //megszerezzük a tokent, hogy autentikálhassunk. az, hogy hogyan állítjuk be, itt nem érdekes??
    const auth = () => {
        //ide rejtjük el az autentikálós izét
        const googleBaseUrl = "https://accounts.google.com/o/oauth2/v2/auth";
        const searchParams = new URLSearchParams();
        searchParams.append("client_id", "423125049963-vnhlm59vvirdjsquu0efhqvq5u91orks.apps.googleusercontent.com");
        searchParams.append("scope", "openid");
        searchParams.append("redirect_uri", "http://localhost:3000/callback");
        searchParams.append("response_type", "code");
        searchParams.append("prompt", "select_account")

        const fullUrl = googleBaseUrl + "?" + searchParams.toString();
        window.open(fullUrl, "_self"); //the _self string makes it open in the same tab
        // window.location.href = fullUrl; //does the same
    };

    const login = async (code, provider) => {
        try {
            const response = await http.post('http://localhost:4000/api/user/login', {
                "code": code,
                "provider": provider
            });
            // console.log("data", response.data);
            setToken(response.data.sessionToken); //amit a backend ad nékünk vissza
            localStorage.setItem("token", response.data.sessionToken);

            setUser(jwt(response.data.sessionToken)); //ez a decoded decoded/user = jwt(response.data.sessionToken)
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