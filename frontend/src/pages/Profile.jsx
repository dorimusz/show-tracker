import React, { useEffect } from "react";
import { useCounter } from "../hooks/useCounter";
import { useCounter as useGlobalCounter } from "../providers/counter";

const Profile = () => {
    const { counter, increment, decrement } = useCounter("profile"); //lokális
    const { value, increment: goUp, decrement: goDown } = useGlobalCounter(); //globális

    return (
        <>
            <h2>Profile</h2>
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