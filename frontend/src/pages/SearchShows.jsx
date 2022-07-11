import React, { useEffect, useState } from 'react'
import http from 'axios'
import SearchShow from '../components/SearchShow';
import '../styles/showcard.css'

const SearchShows = () => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchUrl, setSearchUrl] = useState("");
    const [shows, setShows] = useState([]);

    const load = async () => {
        console.log(searchUrl.length)
        const response = await http.get(`https://api.tvmaze.com/search/shows?q=${searchUrl}`)

        console.log(response)
        console.log(response.data)
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
        <>
            <h2>Search shows</h2>
            <p className="textP">Start typing a keyword a movie title into the field. In case you don't have any idea, just pick one from the most popular ones:</p>
            <form className="searchbar">
                <input

                    id="searchSeries"
                    placeholder="Search for title"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                />

                <button
                    className="searchButtons"
                    onClick={(e) => startSearch(e)}
                >
                    Search
                </button>
            </form>

            <div className='container'>
                <div className='showContainer'>
                    {shows ? shows.map((show, i) => <SearchShow searchedShow={show} key={i} />) : "Series are loading"}
                </div>

            </div>

        </>
    )
}

export default SearchShows