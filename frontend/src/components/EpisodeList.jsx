import React from 'react'
import http from 'axios'
import { useState, useEffect } from 'react'
import Episode from '../components/Episode'

const EpisodeList = (showid) => {
    const [episodes, setEpisodes] = useState([]);
    console.log(showid.showid);

    const loadEp = async () => {
        const responseEps = await http.get(`https://api.tvmaze.com/shows/${showid.showid}/episodes`)
        console.log(responseEps.data);
        setEpisodes(responseEps.data)
    }

    useEffect(() => {
        loadEp()
    }, [])

    return (
        <div>
            {episodes ? episodes.map((episode, i) => <Episode episode={episode} key={i} />) : "Series are loading"}
        </div>
    )
}

export default EpisodeList