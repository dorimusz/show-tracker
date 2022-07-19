import React from 'react'

const Episode = (episode) => {
    return (
        <tr className='episode'>
            <td>{episode.episode.season + ' x ' + episode.episode.number} </td>
            <td>{episode.episode.name}</td>
            <td>{episode.episode.airdate}</td>
        </tr>
    )
}

export default Episode