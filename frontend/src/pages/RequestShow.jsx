import React from 'react'
import RequestedShows from '../components/RequestedShows'
import RequestShowField from '../components/RequestShowField'
import '../styles/Request.css'

const RequestShow = () => {
    return (
        <div className='pageContainer'>
            <h2>Couldn't fins something? Fill in a request</h2>
            <p className="infos">Missing a title you wanted to add? Feel free to contact us, and we'll get to you back as soon as we can!</p>

            <RequestShowField />
            <RequestedShows />



        </div>
    )
}

export default RequestShow