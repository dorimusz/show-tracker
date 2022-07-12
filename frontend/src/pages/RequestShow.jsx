import React from 'react'
import RequestedShows from '../components/RequestedShows'
import RequestShowField from '../components/RequestShowField'

const RequestShow = () => {
    return (
        <div className='conatiner'>
            <h2>Couldn't fins something? Fill in a request</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores magnam ad veritatis velit voluptate animi enim architecto quasi laboriosam quisquam numquam adipisci excepturi ducimus tenetur ipsa, praesentium voluptatum corrupti perferendis!</p>

            <RequestShowField />
            <RequestedShows />



        </div>
    )
}

export default RequestShow