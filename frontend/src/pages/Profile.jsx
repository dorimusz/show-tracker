//protected component, only logged in user can reach it, other than that, navigates away
import React from "react";
import { useAuth } from "../providers/auth";

const Profile = () => {

    const { token } = useAuth()
    // console.log(token);
    return (
        <>
            <h2>Profile</h2>
            <p>{token ? "Welcome at your profile page" : "Anonymus user"}</p>
        </>
    )
}

export default Profile