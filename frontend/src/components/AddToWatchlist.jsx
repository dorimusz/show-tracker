import React from 'react'
import http from 'axios';
const myBackEndURL = "http://localhost:4000/api"

const AddToWatchlist = (props) => {
    const showid = props.showid;
    const show = props.show;
    const episodes = props.episodes;

    const addToWatchlist = async () => {
        const response = await http.post(`${myBackEndURL}/watchlist`, {
            showId: showid,
            name: show.name,
            genres: show.genres,
            status: show.status,
            runtime: show.runtime,
            network: show.network.name,
            image: show.image.medium,
            rating: show.rating.average,
            summary: show.summary,
            seasons: [episodes]
        })
    }


    return (

        <button onClick={addToWatchlist}>Add to watchlist</button>
    )
}

export default AddToWatchlist