import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../providers/auth";

//speciális props
const Protected = ({ children }) => {
    const { token, user } = useAuth();
    const location = useLocation();
    // console.log(location);

    return (
        <>
            {!token ? (
                <Navigate to={"/"} />
            ) : !user.userId && location.pathname !== "/register" ? (
                <Navigate to={"/register"} />
            ) : (
                children
            )}
        </>
    )
}

export default Protected