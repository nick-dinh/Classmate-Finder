import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import {useParams} from "react-router-dom"
import {useSearchParams} from "react-router-dom"
import {useHistory} from 'react-router-dom'
import '../App.css'

function GetPosts() {
    const [postList,setPostsList] = useState([]);
    let history = useHistory();

    // call express API server and get posts and store in list
    useState(() => {
        Axios.get(`http://localhost:5051/api/getPosts`).then((data) => {
            console.log(data)
            setPostsList(data.data)
        });
    },);

    // display all the posts ordered by time of creation
    // should be able to click on the post and be sent to detailed post
    return (
        <div className="PostContainer">
            { postList.map((val, key) => {
                let time = val.scheduledtime.split('T')[0];
                return (
                    <div className="Posts">
                        <span className="post-title" onClick= {() => {
                            (history.push(`/post/${val.postid}`))
                        }}><h2>{val.title}</h2> <p>@{val.location} on {time}</p></span>
                    </div>
                )})
            }
        </div>
    );
}

export default GetPosts
