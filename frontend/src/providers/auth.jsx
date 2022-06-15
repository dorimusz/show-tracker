import React, { useContext, createContext, useState } from "react";
//milyen értéket és metodokat cipelnénk körbe az alkalmazáson - mi fog ide ide kerülni? token

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

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
        window.open(fullUrl)
    };

    const logout = () => {
        setToken(null)
    };

    const contextValue = { token, auth, logout };

    return (
        <>
            <p></p>
            <AuthContext.Provider value={contextValue}>
                {children}
            </AuthContext.Provider>
        </>
    );
};

const useAuth = () => {
    return useContext(AuthContext);
};

export { AuthProvider, useAuth };