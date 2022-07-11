import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../providers/auth';

const Navbar = () => {
    const navigate = useNavigate();
    const { auth, token, logout } = useAuth();

    const nav = (path) => {
        console.log("rerouting"); //bármilyen route előtti logika, elágazás, lejárt-e a token stb
        navigate(path)
    }

    return (
        <>
            <nav className='navbar' style={{ backgroundColor: "gray", position: "absolute", top: "0", width: "100%", display: "flex", justifyContent: "space-between" }}>
                <div>
                    <button onClick={() => nav('/')}>Home</button>
                    <button onClick={() => nav('/about')} > About</button>
                    {/* <button onClick={() => navigate('/profile')} > Profile</button> */}
                    <Link to="/profile" > Profile</Link>
                </div>
                <div>
                    {token ?
                        <button onClick={logout}>Log out</button>
                        :
                        <>
                            <button onClick={() => auth('google')}>Google login</button>
                            <button onClick={() => auth('oid')}>Login</button>
                        </>
                    }
                </div>
            </nav >
        </>
    )
}

export default Navbar