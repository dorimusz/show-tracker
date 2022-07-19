import React from 'react'
import { useState, useEffect } from 'react'
import { toDoApi } from '../api/toDoApi';
import { useAuth } from "../providers/auth";
import '../styles/Manage.css'

const IgnoreShow = ({ show }) => {
    const { patch } = toDoApi();
    const showid = show.showId

    const ignoreShow = async () => {
        const response = await patch(`/myshows/manage/ignore`, { showid })
        window.location.reload(false)
    }

    const unignoreShow = async () => {
        const response = await patch(`/myshows/manage/unignore`, { showid })
        window.location.reload(false)
    }

    return (
        <>
            {!show.isIgnored ? <button className='ignoreButton' onClick={ignoreShow}>Ignore on my watchlist</button> : <button className='unignoreButton' onClick={unignoreShow}>Show on watchlist</button>}
        </>
    )
}

const DeleteShow = ({ show }) => {
    const { del } = toDoApi();
    const showid = show.showId

    const deleteShow = async () => {
        const response = await del(`/myshows/manage`, { data: showid })
        // window.location.reload(false)
    }

    return (
        <>
            {!show.isDeleted ? <button className='deleteButton' onClick={deleteShow}>Delete from my watchlist</button> : null}
        </>
    )

}


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
        <div className='pageContainer'>
            <h2>Manage My Shows</h2>
            {token
                ?
                <div className='whiteContainer'>
                    {watchlist ? watchlist.map((show, i) =>

                        <div key={i} className="tricky">
                            {show.isDeleted ? null :
                                <div className='manageShow'>
                                    <h4>{show.name}</h4>
                                    <IgnoreShow show={show} key={show.name} />
                                    <DeleteShow show={show} key={show.name + show.id} />
                                </div>
                            }
                        </div>

                    )
                        : "No shows and eps to show"}
                </div>
                : "Please log in!"}
        </div>
    )
}

export default ManageShows