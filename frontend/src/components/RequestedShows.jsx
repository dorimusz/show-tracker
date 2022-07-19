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
        <div className='whiteContainer'>
            <table className='epTable'>
                <tr>
                    <th>Requested title</th>
                    <th>Comment</th>
                    <th>Status</th>
                </tr>
                {requests.map((request, i) => <tr className='episode'>
                    <td>{request.title}</td>
                    <td>{request.comment}</td>
                    <td>{request.status}</td>
                </tr>)}
            </table>
        </div>
    )
}

export default RequestedShows