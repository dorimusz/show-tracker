import React from 'react'
import { useEffect } from 'react'
import { useAuth } from "../providers/auth";
import { toDoApi } from '../api/toDoApi';

const Watchlist = () => {
    const { token } = useAuth()
    const { get } = toDoApi();

    const getWatchlist = async () => {
        const response = await get(`/watchlist`)
        console.log(response);
    }

    useEffect(() => {
        getWatchlist()
    }, [])


    return (
        <>
            <div>{token ? <div>Watchlist</div> : "Anonymus user"}</div>
        </>

    )
}

export default Watchlist