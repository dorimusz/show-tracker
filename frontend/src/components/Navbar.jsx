import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../providers/auth';
import '../styles/Navbar.css'

const Navbar = () => {
    const navigate = useNavigate();
    const { auth, token, logout } = useAuth();

    const nav = (path) => {
        navigate(path)
    }

    return (
        <>
            {token ?
                <nav className='navbarUser'>
                    <div className='navWatchlist'>
                        <button className='watchlistButton' onClick={() => nav('/watchlist')} > My watchlist</button>
                    </div>
                    <div className='navControls'>
                        <section className='trackSeries'>
                            <div className='headingHolder'>
                                <p className='heading'>Track TV shows</p>
                            </div>
                            <button onClick={() => nav('/search')} > Search</button>
                            <button onClick={() => nav('/request')} > Request a show</button>
                            <button onClick={() => nav('/myshows/manage')} > Manage my shows</button>
                        </section>
                        <section className='profileSettings'>
                            <div className='headingHolder'>
                                <p className='heading'>Settings</p>
                            </div>
                            <button onClick={() => nav('/profile')} > Profile</button>
                            <button className='logout' onClick={logout}>Log out</button>
                        </section>
                    </div>
                </nav >

                :

                <nav className='navbar'>
                    <div>
                        <button onClick={() => nav('/')}>Home</button>
                        <button onClick={() => nav('/search')} > Search</button>

                    </div>
                    <div>
                        <button className='login' onClick={() => auth('google')}>Google login</button>
                        <button className='login' onClick={() => auth('oid')}>Login</button>


                    </div>
                </nav >
            }
        </>
    )
}

export default Navbar