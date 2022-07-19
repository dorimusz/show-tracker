import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useAuth } from "../providers/auth";
import { toDoApi } from '../api/toDoApi';
import '../styles/Shows.css'

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
            <tr className='episode'>
                <td>{ep.airdate}</td>
                <td>{ep.season + ' x ' + ep.epNumber}</td>
                <td className='epname'>{ep.name}</td>
                <td>
                    {ep.watched ? <button onClick={unWatchEpisode}>Unwatch</button> : <button onClick={watchEpisode}>Add to watched</button>}

                </td>
            </tr>
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
        console.log(response.data.image);
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
                    <div className='whiteContainer'>
                        <div className='showBox'>
                            <div className='showImg'>
                                {show?.image ? <img src={show.image} alt="kep" /> : <img src='https://via.placeholder.com/210x295/ffffff/c0c0c0?text=No+image' alt={show.name} />}
                            </div>

                            <div className='showDetails'>
                                <h4>{show.name}</h4>
                                <p><span>Category: </span>{show?.genres?.toString().split(',').join(', ')}</p>
                                <p><span>Episode length in min: </span>{show.runtime}</p>
                                <p><span>Status: </span>{show.status}</p>
                                {/* <p>Summary: {show.summary}</p> */}
                            </div>
                        </div>

                        <div>
                            <h3>Episodes</h3>
                            <table className='epTable'>
                                <tr>
                                    <th>Airdate</th>
                                    <th>Season x Episode</th>
                                    <th>Title</th>
                                    <th></th>
                                </tr>
                                {show?.seasons?.map((ep, i) => <Eps ep={ep} key={i} showid={showid} />)}
                            </table>

                        </div>

                    </div>
                    :
                    "Please login to manage your watchlist"}
            </div>
        </div>
    )
}

export default CompleteShowModify