import React, { useState } from 'react'
import { toDoApi } from '../api/toDoApi';
import { prepareRequestBody } from '../helpers/request.helper';

const RequestShow = () => {
  const [title, setTitle] = useState('')
  const [comment, setComment] = useState('')
  const [message, setMessage] = useState('')

  const { post } = toDoApi();

  const createRequest = async () => {
    try {
      const response = await post('/request', prepareRequestBody(title, comment))
      console.log(response);

      if (response.status === 200) {
        setMessage('Request created')
      }

    } catch (error) {
      if (!error.response) setMessage("Server error");
    }
  }

  return (

    <div className='request'>
      <div className='requestInputContainer'>
        <input type="text" required placeholder="Type the title you're missing" value={title} onChange={e => setTitle(e.target.value)} />
        <input type="text" placeholder="Adding comment is optional, but may help." value={comment} onChange={e => setComment(e.target.value)} />
      </div>

      <button onClick={() => createRequest()}>Send in my request</button>
      {message && <p>{message}</p>}
    </div>
  )
}

export default RequestShow