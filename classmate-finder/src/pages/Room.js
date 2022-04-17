import React,{useEffect,useState} from 'react'
import {useParams, useHistory} from "react-router-dom"
import Axios from 'axios'
import '../App.css'

function Room() {
    const [messageList,setMessageList] = useState([])
    const [msg, setMessage] = useState("");
    const [user, setUser] = useState("");
    const [added, setAdded] = useState("");
    let {roomId} = useParams();
    let history = useHistory();

    // get username from parameters (url)
    const chatId = roomId.split('-')[0]
    const username = roomId.split('-')[1]

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

    // call express API server to add user
    const APIAdd = () => {
        if (/^[A-Za-z0-9]*$/.test(added)) {
            Axios.get(`http://localhost:5051/api/getTitle/${chatId}`).then((data) => {
                let usertmp = data.data[0].users + ", " + added;
                Axios.post('http://localhost:5051/api/updateRoom', {userName: usertmp, chatID: chatId})
            })
        }
    }

    return (
        // print messages and send messages
        <div className="MessageContainer">
            <h1 className="room-name">Room {chatId}</h1>
            <input id="smtextbox" placeholder="Username" onChange = { (e) => {setAdded(e.target.value)}}></input><button onClick = { APIAdd }>Add to Group</button>
            <br></br><br></br>
            <hr></hr>
            { messageList.map((val, key) => {
                return (
                    <div className="Message">
                        <p className="textmsg"><b>{val.username} : </b>{val.message} | {val.timestamp}</p>
                    </div>
                )})
            }
            <br></br>
            <textarea id="textbox" onChange = { (e) => {setMessage(e.target.value)}}/>
            <button id="textsidebutton" onClick = {APIPost}>Send Message</button>
            <hr></hr>
            <h2 className="click-able" onClick= {() => {(history.push(`/rooms/${username}`))}}>Go Back</h2>
        </div>
    );
}

export default Room
