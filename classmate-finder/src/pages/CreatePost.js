import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import { Button } from 'react-bootstrap'
import {useParams} from "react-router-dom"
import '../App.css'

function CreatePost() {
    const [tit,setTitle] = useState("");
    const [aut,setAuthor] = useState("");
    const [loc,setLocation] = useState("");
    const [bod,setBody] = useState("");
    const [sched,setTime] = useState("");

    // call express API server on port 5051 (post)
    const APIPost = () => {
        Axios.post('http://localhost:5051/api/createPost', {title: tit, author: aut, location: loc, body : bod, time : sched})
    }

    return (
        // get input for the API post
        <div className="GroupCreator">
            <label>Title: </label>
            <input type="text" onChange = { (e) => {
                setTitle(e.target.value)
            }}/><br></br>
            <label>Author: </label>
            <input type="text" onChange = { (e) => {
                setAuthor(e.target.value)
            }}/><br></br>
            <label>Location: </label>
            <input type="text" onChange = { (e) => {
                setLocation(e.target.value)
            }}/><br></br>
            <label>Body: </label><br></br>
            <textarea id="textbox" onChange = { (e) => {
                setBody(e.target.value)
            }}/><br></br>
            <label>Time: </label>
            <input type="text" onChange = { (e) => {
                setTime(e.target.value)
            }}/><br></br>
            <button onClick = { APIPost }>Create Post</button>
        </div>
    )
}

export default CreatePost