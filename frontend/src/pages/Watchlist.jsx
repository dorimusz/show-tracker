import React from 'react'
import { useAuth } from "../providers/auth";

const Watchlist = () => {
    const { token } = useAuth()

    return (
        <div>Watchlist</div>
    )
}

export default Watchlist