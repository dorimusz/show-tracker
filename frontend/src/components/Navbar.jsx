import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../providers/auth';

const Navbar = () => {
    const navigate = useNavigate();
    const { auth, token, logout } = useAuth();

    const nav = (path) => {
        navigate(path)
    }

    return (
        <>
            <nav className='navbar' style={{ backgroundColor: "gray", position: "absolute", top: "0", width: "100%", display: "flex", justifyContent: "space-between" }}>
                <div>
                    <button onClick={() => nav('/')}>Home</button>
                    <button onClick={() => nav('/search')} > Search</button>

                    {token ? <button onClick={() => nav('/watchlist')} > Watchlist</button> : null}

                    {token ? <button onClick={() => nav('/myshows/manage')} > Manage shows</button> : null}

                    {token ? <button onClick={() => nav('/request')} > Request show</button> : null}

                    {token ? <Link to="/profile" > Profile</Link> : null}
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