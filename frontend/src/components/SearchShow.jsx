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
        <div className='showCard'>
            <div className='showImage'>
                {searchedShow.show?.image?.medium ? <img src={searchedShow.show.image.medium} alt="kep" /> : <img src='https://via.placeholder.com/210x295/ffffff/c0c0c0?text=No+image' alt={searchedShow.show.name} />}
            </div>
            <div className='showInfos'>
                <h3>{searchedShow.show.name}</h3>
                <p>Status: {searchedShow.show.status}</p>
                <p>Premiered: {searchedShow.show.premiered ? searchedShow.show.premiered : "missing information"}</p>
                <p>Genres: {genres}</p>
            </div>

            <div className='buttonHolder'>
                <button onClick={showDetails}>More details</button>
            </div>
        </div>
    )
}

export default SearchShow