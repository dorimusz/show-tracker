import React from 'react'
import { useState, useEffect } from 'react'
import { useAuth } from "../providers/auth";
import { toDoApi } from '../api/toDoApi';

const Eps = (ep) => {
    return (
        <>
            <div className='episodeLine'>
                {ep.ep.airdate}
                {ep.ep.name}
                {ep.ep.season}
                {ep.ep.epNumber}
            </div>
            <button>Add to watched</button>
        </>

    )
}

const RenderEpisode = (show) => {
    const episodes = show.show.seasons;
    console.log(episodes);


    return (
        <>
            {episodes.map((ep, i) => <Eps key={i} ep={ep} />)}
        </>
    )

}

const CompleteShowModify = () => {
    const { token } = useAuth()
    const { get } = toDoApi();
    const showid = window.location.href.split("/")[5];
    console.log("selected shows' id FE: " + showid);

    const [show, setShow] = useState([]);
    // const showid = window.location.href.split("/")[4];

    const getShow = async () => {
        const response = await get(`/watchlist/show/${showid}`)
        setShow(response.data.show)
        console.log(response.data);
    }
    // console.log(show);

    useEffect(() => {
        getShow()
    }, [])



    return (
        <>
            <div>
                <div>CompleteShowModify</div>
                <div>
                    {token ? <div>
                        <h2>Watchlist</h2>
                        {show}


                        <div className='watchlistContainer'>
                            {/* {watchlist ? watchlist.map((show, i) => <RenderEpisode key={i} show={show} />) : "No shows and eps to show"} */}

                        </div>


                    </div>
                        :
                        "Anonymus user"}
                </div>


            </div>
        </>
    )
}

export default CompleteShowModify