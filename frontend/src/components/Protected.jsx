//egy komponens, ami csak a gyerek komponenseit rendereli le
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth";

//speciális props-t kap
const Protected = ({ children }) => {
    const { token } = useAuth(); //nem a storageből szedjük, mert nem reaktív, csak így tud rá reagálni
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/')
        }
    }, [token])//ha változik a token, renderelje újra, mert kijelentkezéskor nem dob ki a profilról, ami amúgy protected!!!!!

    return (
        <>
            {/* <React.Fragment>{children}</React.Fragment> */}
            {children}
        </>
    )
}

export default Protected