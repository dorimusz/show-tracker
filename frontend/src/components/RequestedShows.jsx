import React from 'react'
import { useState, useEffect } from 'react'
import { toDoApi } from '../api/toDoApi';

const RequestedShows = () => {
    const { get } = toDoApi();
    const [requests, setRequests] = useState([]);

    const getRequests = async () => {
        const response = await get('/request')
        setRequests(response.data)
        console.log(response.data);
    }

    useEffect(() => {
        getRequests()
    }, [])


    return (
        <div>
            {requests.map((request, i) => <div className='container'>
                {request.title}
                {request.comment}
                {request.status}
            </div>)}
        </div>
    )
}

export default RequestedShows