import React from 'react'
import { useState, useEffect } from 'react'
import { useAuth } from "../providers/auth";
import { toDoApi } from '../api/toDoApi';
import ShowsOnWatchlist from '../components/ShowsOnWatchlist';
import '../styles/Watchlist.css'

const Watchlist = () => {
    const { token } = useAuth()
    const { get } = toDoApi();

    const [watchlist, setWatchlist] = useState([]);

    const getWatchlist = async () => {
        const response = await get(`/watchlist`)
        setWatchlist(response.data.watchlist)
        // console.log(response.data);
    }
    console.log(watchlist);

    useEffect(() => {
        getWatchlist()
    }, [])


    return (
        <div className='pageContainer'>
            {token ? <div>
                <h2>My watchlist</h2>
                <div className='infos'>
                    <p>You can find your tracked tv shows here. To manage episode status, click the button under the picture of the desired show.</p>
                    <p><span className='important'>important: </span>Once you delete a show from your watchlist, you have to add it again to track.</p>
                </div>

                <div className="whiteContainer">
                    <div className="watchlist">
                        {watchlist ? watchlist.map((show, i) =>
                            <ShowsOnWatchlist key={i} show={show} />

                        ) : "No shows and eps to show"}
                    </div>

                </div>
            </div> : "Please log in!"}</div>


    )
}

export default Watchlist