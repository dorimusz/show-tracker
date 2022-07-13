//protected component, only logged in user can reach it, other than that, navigates away
import React from "react";
import { useState, useEffect } from 'react'
import { toDoApi } from '../api/toDoApi';
import { useAuth } from "../providers/auth";

const Profile = () => {
    const { token } = useAuth();
    const { get } = toDoApi();

    const [user, setUser] = useState({});

    const getUser = async () => {
        const response = await get('/user')
        console.log(response.data.user);
        setUser(response.data.user)
    }

    useEffect(() => {
        getUser()
    }, [])


    return (
        <>
            {token ? <h2>Hello <span>{user.username}</span></h2> : <h2>You are not logged in</h2>}



            <div>
                {token ?
                    <div>
                        "Welcome at your profile page"

                    </div>

                    :
                    "Anonymus user, please log in to proceed"}
            </div>
        </>
    )
}

export default Profile