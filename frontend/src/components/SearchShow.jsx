import React from 'react'
// import { Popup } from "reactjs-popup";
// import 'reactjs-popup/dist/index.css';
// import LeaveReview from './LeaveReview';

const SearchShow = ({ searchedShow }) => {
    const images = searchedShow.show.image.original;

    const showDetails = () => {

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
                <p>Genres: {searchedShow.show.genres}</p>
            </div>

            <div className='buttonHolder'>
                <button onClick={showDetails}>More details</button>
            </div>
        </div>
    )
}

export default SearchShow