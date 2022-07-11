import React from "react";
import { useCounter } from "../hooks/useCounter";
import { useCounter as useGlobalCounter } from "../providers/counter";
import { useAuth } from "../providers/auth" //így fogjuk tudni elérni az authot és a token a providerből

const Home = () => {
    const { counter, increment, decrement } = useCounter("Home");
    const { value, increment: goUp, decrement: goDown } = useGlobalCounter();

    const { auth, token } = useAuth();

    return (
        <>
            <h2>Home</h2>
            <p>{token ? "Logged in" : "Anonymus user"}</p>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
            <p>Value home: {counter} </p>


            <button onClick={goUp}>+</button>
            <button onClick={goDown}>-</button>
            <p>Value home: {value} </p>

            {token ? "Welcome" : <>
                <button onClick={() => auth('google')}>Login with Google</button>
                <button onClick={() => auth('oid')}>Log in with email</button>
            </>}

        </>
    )
}

export default Home