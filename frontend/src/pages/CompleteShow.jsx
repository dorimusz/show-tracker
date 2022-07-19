import React from 'react'
import http from 'axios'
import { useState, useEffect, useCallback, useRef } from 'react'
import AddToWatchlist from '../components/AddToWatchlist'
import Episode from '../components/Episode'
import '../styles/Shows.css'

const CompleteShow = () => {
    const showid = window.location.href.split("/")[4];
    const [show, setShow] = useState([]);
    const [image, setImage] = useState('');
    const [episodes, setEpisodes] = useState([]);
    const [onWatchlist, setOnWatchlist] = useState(false);

    const load = async () => {
        const response = await http.get(`https://api.tvmaze.com/shows/${showid}`)
        // console.log(response.data);
        setShow(response.data)
        setImage(response.data.image.medium)
    }

    const loadEp = async () => {
        const responseEps = await http.get(`https://api.tvmaze.com/shows/${showid}/episodes`)
        // console.log(responseEps.data);
        setEpisodes(responseEps.data)
    }

    useEffect(() => {
        load()
        loadEp()
    }, [])

    return (
        <div className='pageContainer'>
            <h2>{show.name}</h2>
            <div className='whiteContainer'>
                <div className='showBox'>
                    <div className='showImg'>
                        <img src={image} alt="kep" />
                    </div>

                    <div className='showDetails'>
                        {show ? <p><span>Status: </span>{show.status}</p> : <p><span>Status: </span>unknown</p>}
                        {show.network ? <p><span>Network: </span>{show.network.name}</p> : <p>Network: unknown</p>}
                        {show.genres ? <p><span>Genres: </span>{show.genres.toString().split(',').join(', ')}</p> : <p>Genres: unknown</p>}
                        {show.runtime ? <p><span>Runtime in minutes: </span>{show.runtime}</p> : <p>Runtime in: no info</p>}
                        {show.rating?.average ? <p><span>Rating: </span>{show.rating.average}</p> : <p><span>Rating: </span>no info</p>}

                        <div className='buttonHolder'>
                            {onWatchlist ? <p>Added to your watchlist. To manage your series go to Watchlist page.</p> : <AddToWatchlist showid={showid} show={show} episodes={episodes} setOnWatchlist={setOnWatchlist} />}
                        </div>
                    </div>
                </div>
            </div>

            <div className='whiteContainer'>
                <table className='epTable'>
                    <tr>
                        <th>Season x Episode</th>
                        <th>Title</th>
                        <th>Airdate</th>
                        <th></th>
                    </tr>
                    {episodes ? episodes.map((episode, i) => <Episode episode={episode} key={i} />) : "Series are loading"}
                </table>
            </div>

            <div className='episodesContainer'>

            </div>
        </div>
    )
}

export default CompleteShow