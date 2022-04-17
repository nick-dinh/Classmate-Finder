import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import {useParams} from "react-router-dom"
import {useSearchParams} from "react-router-dom"
import {useHistory} from 'react-router-dom'
import '../App.css'

function GetRooms() {
    // get username from url
    const [roomList,setRoomList] = useState([]);
    let {userName} = useParams();
    let history = useHistory();

    // call express API server and get rooms and store in list
    useEffect(() => {
        Axios.get(`http://localhost:5051/api/getChatsFromName/${userName}`).then((data) => {
            setRoomList(data.data)
        });
    },[userName]);

    // display all the rooms that user is a part of
    // should be able to click on the room and be sent to a new page with the messages
    return (
        <div className="nd">
            <div className="RoomContainer">
                <h2>Open Rooms</h2>
                <ul>
                    { roomList.map((val, key) => {
                        return (
                            <p onClick= {() => {(history.push(`/room/${val.chatid}-${userName}`))}}>{val.users}</p>
                        )})
                    }
                </ul>
            </div>
        </div>
    );
}

export default GetRooms
