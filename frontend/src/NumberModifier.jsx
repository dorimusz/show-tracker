import React from 'react'

const NumberModifier = ({ increment, decrement }) => {
    return (
        <>
            <h2>NumberModifier</h2>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </>
    )
}

export default NumberModifier