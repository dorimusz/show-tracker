import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/auth';
import '../styles/Register.css'

const Register = () => {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const { register, user, auth } = useAuth();

    useEffect(() => {
        if (user.userId) navigate('/profile')
    }, [user])

    return (
        <div className='pageContainer'>
            <h2>Add username to reg in</h2>
            <div className='whiteContainer'>
                <div className='requestForm registerForm'>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Your username goes here" />
                    <div className='buttonHolder regbuttons'>
                        <button onClick={() => register(username)}>Register</button>
                    </div>
                    <h4>OR</h4>
                    <div className='buttonHolder regbuttons'>
                        <button onClick={() => auth('google')}>Google login</button>
                        <button onClick={() => auth('oid')}>Username login</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Register