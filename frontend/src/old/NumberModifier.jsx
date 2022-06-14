import React from 'react'
import NumberPresenter from './NumberPresenter'
import { useCounter } from './CounterProvider'

const NumberModifier = () => {
    const { value, increment, decrement } = useCounter()
    return (
        <>
            <h2>NumberModifier</h2>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>

            <NumberPresenter value={value} />
        </>
    )
}

export default NumberModifier