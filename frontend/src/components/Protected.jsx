//egy komponens, ami csak a gyerek komponenseit rendereli le
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth";

//speciális props-t kap
const Protected = ({ children }) => {
    const { token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/')
        }
    }, [])

    return (
        <>
            {children}
        </>
    )
}

export default Protected