import React from 'react'

const Episode = (episode) => {

    return (
        <div className='episode'>
            <p>{episode.episode.airdate}</p>
            <p>{episode.episode.name}</p>
            <p>{episode.episode.season}</p>
            <p>{episode.episode.number}</p>
        </div>
    )
}

export default Episode