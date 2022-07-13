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
        <div>
            {!fullShow.isIgnored || !fullShow.isDeleted ?
                <div>
                    {fullShow.name}
                    {fullShow.image ? <img src={fullShow.image} alt={fullShow.name} /> : null}
                    <div className='buttonHolder'>
                        <button onClick={takeToShowPage}>Edit watched episodes</button>
                    </div>
                </div>
                :
                null
            }

            {/* 
            {fullShow.name}
            {fullShow.image ? <img src={fullShow.image} alt={fullShow.name} /> : null}
            <div className='buttonHolder'>
                <button onClick={takeToShowPage}>Edit watched episodes</button>
            </div> */}

        </div>
    )
}

export default ShowsOnWatchlist