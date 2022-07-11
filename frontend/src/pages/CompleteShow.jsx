import React from 'react'
import http from 'axios'
import { useState, useEffect } from 'react'
import AddToWatchlist from '../components/AddToWatchlist'
// import EpisodeList from '../components/EpisodeList'
import Episode from '../components/Episode'

const CompleteShow = () => {
    const showid = window.location.href.split("/")[4];
    const [show, setShow] = useState([]);
    const [image, setImage] = useState('');
    const [episodes, setEpisodes] = useState([]);

    const load = async () => {
        const response = await http.get(`https://api.tvmaze.com/shows/${showid}`)
        // console.log(response.data);
        setShow(response.data)
        setImage(response.data.image.medium)
    }

    const loadEp = async () => {
        const responseEps = await http.get(`https://api.tvmaze.com/shows/${showid}/episodes`)
        console.log(responseEps.data);
        setEpisodes(responseEps.data)
    }

    useEffect(() => {
        load()
        loadEp()
    }, [])

    return (
        <>
            <div>
                <div className='showDetails'>
                    <h2>{show.name}</h2>
                    <div>
                        <img src={image} alt="kep" />
                    </div>

                    <div className='showInfos'>
                        {show ? <p>Status: {show.status}</p> : <p>Status: unknown</p>}
                        {show.network ? <p>Network: {show.network.name}</p> : <p>Network: unknown</p>}
                        {show.genres ? <p>Genres: {show.genres.toString().split(',').join(', ')}</p> : <p>Genres: unknown</p>}
                        {show.runtime ? <p>Runtime: {show.runtime}</p> : <p>Runtime: no info</p>}
                        {show.rating?.average ? <p>Rating: {show.rating.average}</p> : <p>Rating: no info</p>}


                    </div>
                    <AddToWatchlist showid={showid} show={show} episodes={episodes} />

                </div>

                <div>
                    {episodes ? episodes.map((episode, i) => <Episode episode={episode} key={i} />) : "Series are loading"}
                </div>
                {/* <EpisodeList showid={showid} /> */}

                <div className='episodesContainer'>

                </div>
            </div>

        </>
    )
}

export default CompleteShow