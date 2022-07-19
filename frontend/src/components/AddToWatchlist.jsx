import React from 'react'
import { toDoApi } from '../api/toDoApi';
import { useState, useEffect } from 'react'
import { prepareShowBody } from '../helpers/show.helper';
import { useAuth } from "../providers/auth"

const AddToWatchlist = (props) => {
    const setOnWatchlist = props.setOnWatchlist;
    const showid = props.showid;
    const show = props.show;
    const episodes = props.episodes;

    const { post } = toDoApi();
    const { token } = useAuth();

    const addToWatchlist = async () => {
        const response = await post(`/watchlist`, prepareShowBody(showid, show, episodes))
        console.log(response);
        setOnWatchlist(true)

        if (response.status === 409) {
            alert("Show already on your watchlist")
        }
    }

    return (
        <>
            {token ? <button className='addWatchlist' onClick={addToWatchlist}>Add to watchlist</button> : <p>Want to track show? Log in!</p>}
        </>

    )
}

export default AddToWatchlist