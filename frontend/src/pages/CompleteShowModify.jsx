import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useAuth } from "../providers/auth";
import { toDoApi } from '../api/toDoApi';

const Eps = ({ ep, showid }) => {
    const watchEpisode = async () => {
        const { patch } = toDoApi();
        const response = await patch(`/watchlist`, { showid, id: ep._id })
        window.location.reload(false)
    }

    const unWatchEpisode = async () => {
        const { del } = toDoApi();
        const response = await del(`/watchlist`, { data: { showid, id: ep._id } })
        window.location.reload(false)
    }

    return (
        <>
            <div className='episodeLine'>
                {ep.airdate}
                {ep.name}
                {ep.season}
                {ep.epNumber}
            </div>
            {ep.watched ? <button onClick={unWatchEpisode}>Unwatch</button> : <button onClick={watchEpisode}>Add to watched</button>}
        </>
    )
}

const CompleteShowModify = () => {
    const { token } = useAuth()
    const { get } = toDoApi();
    const showid = window.location.href.split("/")[5];
    console.log("selected shows' id FE: " + showid);

    const [show, setShow] = useState([]);

    const getShow = async () => {
        const response = await get(`/watchlist/show/${showid}`)
        setShow(response.data)
        console.log(response.data.name);
    }
    useEffect(() => {
        getShow()
    }, [])

    return (
        <div className='pageContainer'>
            <h2>Manage your <span>{show.name}</span> episodes</h2>
            <div>
                {token
                    ?
                    <div>
                        <h3>Season info</h3>
                        {show.name}

                        <div className='showImage'>
                            {show?.image?.medium ? <img src={show.image.medium} alt="kep" /> : <img src='https://via.placeholder.com/210x295/ffffff/c0c0c0?text=No+image' alt={show.name} />}
                        </div>
                        <div className='showInfo'>
                            <p>Category: {show?.genres?.toString().split(',').join(', ')}</p>
                            <p>Episode length: {show.runtime}</p>
                            <p>Status: {show.status}</p>
                            {/* <p>Summary: {show.summary}</p> */}
                        </div>

                        <h3>Episodes</h3>
                        {show?.seasons?.map((ep, i) => <Eps ep={ep} key={i} showid={showid} />)}

                    </div>
                    :
                    "Please login to manage your watchlist"}
            </div>
        </div>
    )
}

export default CompleteShowModify