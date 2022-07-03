//protected component, only logged in user can reach it, other than that, navigates away
import React from "react";
import { useCounter } from "../hooks/useCounter";
import { useCounter as useGlobalCounter } from "../providers/counter";
import { useAuth } from "../providers/auth";

const Profile = () => {
    const { counter, increment, decrement } = useCounter("profile"); //lokális
    const { value, increment: goUp, decrement: goDown } = useGlobalCounter(); //globális

    const { token } = useAuth()
    console.log(token);

    return (
        <>
            <h2>Profile</h2>
            <p>{token ? "Logged in" : "Anonymus user"}</p>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
            <p>Value: {counter} </p>

            <button onClick={goUp}>+</button>
            <button onClick={goDown}>-</button>
            <p>Value home: {value} </p>
        </>
    )
}

export default Profile