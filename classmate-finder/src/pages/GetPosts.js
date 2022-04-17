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
            setPostsList(data.data)
        });
    },);

    // display all the posts ordered by time of creation
    // should be able to click on the post and be sent to detailed post
    return (
        <div className="nd">
            <div className="PostsContainer">
                <button className="buttongr" onClick = {() => { history.push("/createpost"); }}>Create Post</button>
                <h1>Social Posts</h1>
                <ul>
                    { postList.map((val, key) => {
                        let time = val.scheduledtime.split('T')[0];
                        return (
                            <div className="Posts">
                                <h2>{val.title}</h2> 
                                <p>@{val.location} on {time}</p>
                                <p className="link" onClick= {() => {(history.push(`/post/${val.postid}`))}}>Read More</p>
                            </div>
                        )})
                    }
                </ul>
            </div>
        </div>
    );
}

export default GetPosts
