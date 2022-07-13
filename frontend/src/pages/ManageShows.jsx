import React from 'react'
import { useState, useEffect } from 'react'
import { toDoApi } from '../api/toDoApi';
import { useAuth } from "../providers/auth";

const ManageShows = () => {
    const { get } = toDoApi();
    const { token } = useAuth()
    const [watchlist, setWatchlist] = useState([]);

    const getWatchlist = async () => {
        const response = await get(`/watchlist`)
        setWatchlist(response.data.watchlist)
        // console.log(response.data);
    }
    // console.log(watchlist);

    useEffect(() => {
        getWatchlist()
    }, [])
    return (
        <>
            <h2>Manage My Shows</h2>
            <div>{token ? <div>
                <h2>My watchlist</h2>

                <div className='watchlistContainer'>
                    {watchlist ? watchlist.map((show, i) =>

                        <div>
                            <p>{show.name}</p>
                            {!show.isIgnored ? <button>Ignore on my watchlist</button> : <button>Show on watchlist</button>}

                            {!show.isDeleted ? <button>Delete from my watchlist</button> : null}

                        </div>

                    )
                        : "No shows and eps to show"}
                </div>
            </div> : "Please log in!"}</div>
        </>
    )
}

export default ManageShows