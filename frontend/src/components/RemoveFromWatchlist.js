import React from 'react'
import { toDoApi } from '../api/toDoApi';
import { prepareRemoveShowBody } from '../helpers/removeshow.helper';

const RemoveFromWatchlist = (props) => {
    const setOnWatchlist = props.setOnWatchlist;
    const showid = props.showid;

    const { post } = toDoApi();

    const removeFromWatchlist = async () => {
        const response = await post(`/watchlist/ignore`, prepareRemoveShowBody(showid))
    }
    setOnWatchlist(false)


    return (
        <button onClick={removeFromWatchlist}>Remove from watchlist</button>
    )
}

export default RemoveFromWatchlist


