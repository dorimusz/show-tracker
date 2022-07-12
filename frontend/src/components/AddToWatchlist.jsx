import React from 'react'
import { toDoApi } from '../api/toDoApi';
import { useState, useEffect } from 'react'
import { prepareShowBody } from '../helpers/show.helper';

const AddToWatchlist = (props) => {
    const setOnWatchlist = props.setOnWatchlist;
    const showid = props.showid;
    const show = props.show;
    const episodes = props.episodes;

    const { post } = toDoApi();

    const addToWatchlist = async () => {
        const response = await post(`/watchlist`, prepareShowBody(showid, show, episodes))
        console.log(response);
        setOnWatchlist(true)

        if (response.status === 409) {
            alert("Show already on your watchlist")
        }
    }

    return (
        <button onClick={addToWatchlist}>Add to watchlist</button>
    )
}

export default AddToWatchlist