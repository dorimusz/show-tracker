//egy komponens, ami csak a gyerek komponenseit rendereli le
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../providers/auth";

//speciális props-t kap
const Protected = ({ children }) => {
    const { token, user } = useAuth();
    const location = useLocation();
    console.log(location);


    return (
        <>
            {/* <React.Fragment>{children}</React.Fragment> */}
            {!token ? (
                <Navigate to={"/"} />
            ) : !user.userId && location.pathname !== "/register" ? (
                <Navigate to={"/register"} />
            ) : (
                children
            )}

            {/* {children} */}
        </>
    )
}

export default Protected