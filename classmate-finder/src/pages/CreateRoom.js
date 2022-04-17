import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import { Button } from 'react-bootstrap'
import {useParams} from "react-router-dom"
import '../App.css'

function CreateRoom() {
    const [users,setUsers] = useState("");

    // call express API server on port 5051 (post)
    const APIPost = () => {
        Axios.post('http://localhost:5051/api/createRoom', {usersList: users})
    }

    return (
        // get input for the API post   
        <div className="GroupCreator">
            <label>Users (..., ..., ...): </label>
            <input type="text" onChange = { (e) => {
                setUsers(e.target.value)
            }}/>
            <button onClick = { APIPost }>Create Chatroom</button>
        </div>
    )
}

export default CreateRoom