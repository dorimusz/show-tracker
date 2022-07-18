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
        <div className='pageContainer'>
            {token
                ?
                <h2>Hello <span>{user.username}</span></h2>
                :
                <h2>You are not logged in</h2>}



            <div>
                {token ?
                    <div>
                        <div>
                            <h3>Your personal information</h3>
                            <div className="loginInfo">
                                <h4> Your personal info: </h4>
                                <p>Login name: {user.username}</p>
                            </div>

                            {/* <div className="personalInfo">
                                <h4> Your login info: </h4>
                                <p>Login name: {user.username}</p>
                                <p>Login password: <span>At this stage of the app you cannot change your password.</span></p>
                            </div> */}
                        </div>


                    </div>

                    :
                    "Anonymus user, please log in to proceed"}
            </div>
        </div>
    )
}

export default Profile