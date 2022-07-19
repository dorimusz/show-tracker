import React from 'react'
import { useNavigate } from 'react-router-dom';

const ShowsOnWatchlist = (show) => {
    const navigate = useNavigate();
    const fullShow = show.show
    const episodes = show.show.seasons

    const takeToShowPage = (id) => {
        id = fullShow.showId
        navigate(`/watchlist/show/${id}`)
    }

    return (
        <>
            {!fullShow.isIgnored
                ?
                <div className='watchCard'>
                    <h4>{fullShow.name}</h4>
                    {fullShow.image ? <img className='watchlistImg' src={fullShow.image} alt={fullShow.name} /> : null}
                    <div className='buttonHolder'>
                        <button onClick={takeToShowPage}>Track episodes</button>
                    </div>
                </div>
                :
                null
            }

        </>




    )
}

export default ShowsOnWatchlist