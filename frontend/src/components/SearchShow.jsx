import React from 'react'
import { useNavigate } from 'react-router-dom';
// import { Popup } from "reactjs-popup";
// import 'reactjs-popup/dist/index.css';

const SearchShow = ({ searchedShow }) => {
    const navigate = useNavigate();
    const genres = searchedShow.show.genres.toString().split(',').join(', ');

    const showDetails = (id) => {
        id = searchedShow.show.id
        navigate(`/show/${id}/episodes`)
    }

    return (
        <div className='watchCard searchCard'>
            <div className='imgHolder'>
                {searchedShow.show?.image?.medium ? <img src={searchedShow.show.image.medium} alt="kep" className='watchlistImg searchImg' /> : <img src='https://via.placeholder.com/210x236/ffffff/c0c0c0?text=No+image' alt={searchedShow.show.name} />}
            </div>

            <div className='buttonHolder'>
                <button className='showButton' onClick={showDetails}>Show more</button>
            </div>
            <div className='showInfos'>
                <h3 className='searchH3'>{searchedShow.show.name}</h3>
                <p>{searchedShow.show.status}</p>
                <p>Premiered: {searchedShow.show.premiered ? searchedShow.show.premiered : "missing information"}</p>
                <p>{genres}</p>
            </div>

        </div>
    )
}

export default SearchShow