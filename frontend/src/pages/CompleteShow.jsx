import React from 'react'
import http from 'axios'
import { useState, useEffect } from 'react'
import Episode from '../components/Episode'

const CompleteShow = (id) => {
    const showid = window.location.href.split("/")[4];
    const [episodes, setEpisodes] = useState([]);
    const [show, setShow] = useState([]);

    const load = async () => {
        const response = await http.get(`https://api.tvmaze.com/shows/${showid}`)
        console.log(response.data);
        const responseEps = await http.get(`https://api.tvmaze.com/shows/${showid}/episodes`)
        setEpisodes(responseEps.data)
        setShow(response.data)
    }


    useEffect(() => {
        load()
    }, [])

    return (
        <>
            <div>
                <div className='showDetails'>
                    <h2>{show.name}</h2>

                </div>

                <div className='episodesContainer'>
                    {episodes ? episodes.map((episode, i) => <Episode episode={episode} key={i} />) : "Series are loading"}
                </div>
            </div>

        </>
    )
}

export default CompleteShow