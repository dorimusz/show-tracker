import React, { useContext, createContext, useState } from "react";
import http from 'axios'
import { useEffect } from "react";
//milyen értéket és metodokat cipelnénk körbe az alkalmazáson - mi fog ide ide kerülni? token

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setToken(token)
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
            console.log("data", response.data);
            setToken(response.data.sessionToken); //amit a backend ad nékünk vissza
            localStorage.setItem("token", response.data.sessionToken);

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

    const contextValue = { token, auth, logout, login };

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