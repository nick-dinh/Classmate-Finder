import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import { Button } from 'react-bootstrap'
import {useParams} from "react-router-dom"
import {useHistory} from 'react-router-dom'
import '../App.css'

function UpdatePost() {
    let {postId} = useParams();
    const [tit,setTitle] = useState("");
    const [loc,setLocation] = useState("");
    const [bod,setBody] = useState("");
    const [sched,setTime] = useState("");

    let history = useHistory();

    // call express API server on port 5051 (post)
    const APIPost = () => {
        Axios.post('http://localhost:5051/api/updatePost', {id: postId, title: tit, location: loc, body : bod, time : sched})
    }

    return (
        // get input for the API post
        <div className="PostUpdator">
            <h1>Update Post</h1>
            <h2>Title</h2>
            <textarea id="textbox" placeholder="Enter text." onChange = { (e) => {setTitle(e.target.value)}}/>
            <h2>Location</h2>
            <textarea id="textbox" placeholder="Enter text." onChange = { (e) => {setLocation(e.target.value)}}/>
            <h2>Body</h2>
            <textarea id="textbox" placeholder="Enter text." onChange = { (e) => {setBody(e.target.value)}}/>
            <h2>Time</h2>
            <textarea id="textbox" placeholder="YYYY-MM-DD HH:MM:SS" onChange = { (e) => {setTime(e.target.value)}}/>
            <br></br>
            <button onClick = { APIPost }>Update Post</button>
            <h2 className="click-able" onClick= {() => {(history.push(`/posts`))}}>Go Back</h2>
        </div>
    )
}

export default UpdatePost