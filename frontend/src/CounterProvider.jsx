import React from 'react'
import { useState } from 'react'
import { useContext, createContext } from "react";

const CounterContext = createContext()

//a counterprovider child komponeneseket kap meg propsként
const CounterProvider = ({ children }) => {
    const [value, setValue] = useState(0);

    const increment = () => {
        setValue(value + 1)
    };

    const decrement = () => {
        setValue(value - 1)
    };

    const contextValue = { value, increment, decrement }

    /* {children} ez itt az összes többi komponenest jelöli */
    return (
        <CounterContext.Provider value={contextValue}>
            {children}
        </CounterContext.Provider>
    )
}

const useCounter = () => {
    return useContext(CounterContext)
}

export { CounterProvider, useCounter }