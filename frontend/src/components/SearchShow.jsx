import React from 'react'
import { useNavigate } from 'react-router-dom';
// import { Popup } from "reactjs-popup";
// import 'reactjs-popup/dist/index.css';
// import LeaveReview from './LeaveReview';

const SearchShow = ({ searchedShow }) => {
    const navigate = useNavigate();
    const images = searchedShow.show.image.original;
    const genres = searchedShow.show.genres.toString().split(',').join(', ');

    console.log(genres.toString())
    console.log(genres.slice());

    const showDetails = (id) => {
        id = searchedShow.show.id
        navigate(`/show/${id}/episodes`)
    }

    return (
        <div className='showCard'>
            <div className='showImage'>
                <img src={images} alt={searchedShow.show.name} />
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