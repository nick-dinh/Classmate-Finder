import React,{useEffect,useState} from 'react'
import {useParams, useHistory} from "react-router-dom"
import Axios from 'axios'
import '../App.css'

function Room() {
    const [messageList,setMessageList] = useState([])
    const [msg, setMessage] = useState("");
    let {roomId} = useParams();

    let history = useHistory();

    // get username from parameters (url)
    const chatId = roomId.split('-')[0]
    const username = roomId.split('-')[1]
    console.log(username)

    // call express API server and get messages from ID
    useEffect(() => {
        Axios.get(`http://localhost:5051/api/getMessagesFromID/${roomId}`).then((data) => {
            console.log(data);
            setMessageList(data.data);
        });
    },[roomId]);

    // call express API server on port 5051 (post) to create message
    const APIPost = () => {
        Axios.post('http://localhost:5051/api/createMessage', {userName: username, message: msg, chatID: chatId})
        window.location.reload(true)
    }

    return (
        // print messages and send messages
        <div className="MessageContainer">
            <h1 className="room-name">Room {chatId}</h1>
            { messageList.map((val, key) => {
                return (
                    <div className="Message">
                        <p className="textmsg"><b>{val.username} : </b>{val.message} | {val.timestamp}</p>
                    </div>
                )})
            }
            <input type="text" onChange = { (e) => {
                setMessage(e.target.value)
            }}/><button onClick = { APIPost }>Send Message</button>
            <h2 className="room-name" onClick= {() => {
                (history.push(`/rooms/${username}`))
            }}>Go Back</h2>
        </div>
    );
}

export default Room
