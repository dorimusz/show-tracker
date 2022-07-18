import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/auth';

const Register = () => {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const { register, user, auth } = useAuth();

    useEffect(() => {
        if (user.userId) navigate('/profile')
    }, [user])

    return (
        <div className='pageContainer'>
            <div>
                <h2>Add username to reg in</h2>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <button onClick={() => register(username)}>Register</button>
            </div>
            <h3>OR</h3>
            <button onClick={() => auth('google')}>Google</button>
            <button onClick={() => auth('oid')}>Email</button>
        </div>
    )
}

export default Register