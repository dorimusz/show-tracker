import React from "react";
import { useAuth } from "../providers/auth" //így fogjuk tudni elérni az authot és a token a providerből

const Home = () => {
    const { auth, token } = useAuth();

    return (
        <>
            <h2>Home</h2>
            <p>{token ? "Logged in" : "Anonymus user"}</p>

            {token ? <>
                <p>Welcome</p>
            </> : <>
                <button onClick={() => auth('google')}>Login with Google</button>
                <button onClick={() => auth('oid')}>Log in with email</button>
            </>}

        </>
    )
}

export default Home