import React, { useEffect, useState } from 'react'
import http from 'axios'
import SearchShow from '../components/SearchShow';
import '../styles/showcard.css'
import '../styles/Search.css'

const SearchShows = () => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchUrl, setSearchUrl] = useState("");
    const [shows, setShows] = useState([]);

    const load = async () => {
        const response = await http.get(`https://api.tvmaze.com/search/shows?q=${searchUrl}`)
        setShows(response.data)
    }

    useEffect(() => {
        load();
    }, [searchUrl])

    const startSearch = (e) => {
        setSearchUrl(searchKeyword)
        e.preventDefault();
    }

    return (
        <div className='pageContainer'>
            <h2>Search shows</h2>
            <p className="infos">Start typing a keyword a movie title into the field. In case you don't have any idea, just pick one from the most popular ones:</p>

            <div className="searchbar">
                <input

                    id="searchSeries"
                    placeholder="Search for title"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                />

                <button
                    className="searchButton"
                    onClick={(e) => startSearch(e)}
                >
                    Search
                </button>
            </div>


            <div className='whiteContainer'>
                <div className="watchlist">
                    {shows ? shows.map((show, i) => <SearchShow searchedShow={show} key={i} />) : "Series are loading"}
                </div>
            </div>

        </div>
    )
}

export default SearchShows