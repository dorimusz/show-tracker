import React from 'react'
import http from 'axios'
import { useState, useEffect } from 'react'
// import Episode from '../components/Episode'
import EpisodeList from '../components/EpisodeList'

const CompleteShow = () => {
    const showid = window.location.href.split("/")[4];
    // const [episodes, setEpisodes] = useState([]);
    const [show, setShow] = useState([]);
    const [image, setImage] = useState('');

    const load = async () => {
        const response = await http.get(`https://api.tvmaze.com/shows/${showid}`)
        console.log(response.data);
        setShow(response.data)
        setImage(response.data.image.medium)
    }

    useEffect(() => {
        load()
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
                    <button>Add to my watchlist</button>

                </div>
                <EpisodeList showid={showid} />

                <div className='episodesContainer'>

                </div>
            </div>

        </>
    )
}

export default CompleteShow