import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import {useParams} from "react-router-dom"
import '../App.css'

function CreatePost() {
    const [tit,setTitle] = useState("");
    const [loc,setLocation] = useState("");
    const [bod,setBody] = useState("");
    const [sched,setTime] = useState("");
    let aut = "nick d";
    let history = useHistory();

    // call express API server on port 5051 (post)
    const APIPost = () => {
        // need to regex to make sure it doesnt break the server
        Axios.post('http://localhost:5051/api/createPost', {title: tit, author: aut, location: loc, body : bod, time : sched})
    }

    return (
        // get input for the API post
        <div className="nd">
            <div className="GroupCreator">
                <h1>Create Post</h1>
                <h2>Title</h2>
                <textarea id="textbox" placeholder="Enter text." onChange = { (e) => {setTitle(e.target.value)}}/>
                <h2>Location</h2>
                <textarea id="textbox" placeholder="Enter text." onChange = { (e) => {setLocation(e.target.value)}}/>
                <h2>Body</h2>
                <textarea id="textbox" placeholder="Enter text." onChange = { (e) => {setBody(e.target.value)}}/>
                <h2>Time</h2>
                <textarea id="textbox" placeholder="YYYY-MM-DD HH:MM:SS" onChange = { (e) => {setTime(e.target.value)}}/>
                <br></br>
                <button className="buttongr" onClick = { APIPost }>Create Post</button>
                <button className="button" onClick= {() => {(history.push(`/posts`))}}>Go Back</button>
            </div>
        </div>
    )
}

export default CreatePost