import React from 'react'
import { useState, useEffect } from 'react'
import http from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/auth';

const Register = () => {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const { register, user } = useAuth();

    // const triggerRegister = async () => {
    //     await register(username);
    // }

    useEffect(() => {
        if (user.userId) navigate('/profile')
    }, [user])

    return (
        <div>
            <h2>Add username to reg in</h2>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <button onClick={() => register(username)}>Register</button>
        </div>
    )
}

export default Register