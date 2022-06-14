import React from "react";
import { useCounter } from "../hooks/useCounter";
import { useCounter as useGlobalCounter } from "../providers/counter";

const Home = () => {
    const { counter, increment, decrement } = useCounter("Home");
    const { value, increment: goUp, decrement: goDown } = useGlobalCounter();

    return (
        <>
            <h2>Home</h2>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
            <p>Value home: {counter} </p>


            <button onClick={goUp}>+</button>
            <button onClick={goDown}>-</button>
            <p>Value home: {value} </p>
        </>
    )
}

export default Home