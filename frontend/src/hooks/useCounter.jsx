import React, { useState, useEffect } from "react";

export const useCounter = (path) => {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        localStorage.setItem(path, counter)
    }, [counter]);

    useEffect(() => {
        const localCounter = parseInt(localStorage.getItem(path));
        setCounter(localCounter || 0);
    }, []);

    const increment = () => {
        setCounter(counter + 1)
    }

    const decrement = () => {
        setCounter(counter - 1)
    }

    return { counter, increment, decrement } //egy objectben köpje ki ezeket
};