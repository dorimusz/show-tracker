import React from 'react' //rafce
import { useCounter } from './CounterProvider'

const NumberPresenter = () => {
    const { value } = useCounter(); //coming from the CounterProvider, just no need for inc. and dec. functions
    return (
        <>
            <h2>NumberPresenter</h2>
            <p>Value from parameter: {value}</p>
        </>
    )
}

export default NumberPresenter