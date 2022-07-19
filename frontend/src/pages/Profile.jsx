//protected component, only logged in user can reach it, other than that, navigates away
import React from "react";
import { useState, useEffect } from 'react'
import { toDoApi } from '../api/toDoApi';
import { useAuth } from "../providers/auth";
import '../styles/Profile.css'

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
                <h2>Hello <span className="h2username">{user.username}</span>, hope you're having a nice day!</h2>
                :
                <h2>You are not logged in</h2>}

            {token
                ?
                <div className="whiteContainer">
                    <h3>Your personal information</h3>
                    <div className="profileSections">
                        <div className="loginInfo">
                            <h4> Your login info: </h4>
                            <p>Login name: <span className="pUsername">{user.username}</span></p>
                            <p>Login password: <span className='greyText'>At this stage of the app you cannot change your password.</span></p>
                        </div>
                        <hr></hr>
                        <div className="personalInfo">
                            <h4> Your personal info: </h4>
                            <p>Login name: <span className="pUsername">{user.username}</span></p>

                        </div>
                    </div>


                </div>
                :
                "Anonymus user, please log in to proceed"}

        </div>
    )
}

export default Profile