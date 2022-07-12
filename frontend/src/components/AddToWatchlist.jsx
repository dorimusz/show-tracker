import React from 'react'
import { toDoApi } from '../api/toDoApi';
import { prepareShowBody } from '../helpers/show.helper';

const AddToWatchlist = (props) => {
    const showid = props.showid;
    const show = props.show;
    const episodes = props.episodes;

    const { post } = toDoApi();

    const addToWatchlist = async () => {
        const response = await post(`/watchlist`, prepareShowBody(showid, show, episodes))
        // console.log(prepareShowBody(showid, show, episodes));

    }

    return (
        <button onClick={addToWatchlist}>Add to watchlist</button>
    )
}

export default AddToWatchlist