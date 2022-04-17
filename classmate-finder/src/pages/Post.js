import React,{useEffect,useState} from 'react'
import {useParams, useHistory} from "react-router-dom"
import Axios from 'axios'
import '../App.css'

function Post() {
    const [detailsList,setDetailsList] = useState([])
    const [commentsList,setCommentsList] = useState([])
    const [msg, setMessage] = useState("");
    let {postId} = useParams();
    let username = "tomato";
    let author = "";

    console.log(postId)

    let history = useHistory();

    // call express API server and get post contents from ID
    useEffect(() => {
        Axios.get(`http://localhost:5051/api/getPost/${postId}`).then((data) => {
            console.log(data);
            setDetailsList(data.data);
        });
        Axios.get(`http://localhost:5051/api/getCommentsFromID/${postId}`).then((data) => {
            console.log(data);
            setCommentsList(data.data);
        });
    },[postId]);

    // call express API server on port 5051 (post) to create comment
    const APIPost = () => {
        Axios.post('http://localhost:5051/api/createComment', {userName: username, message: msg, postID: postId})
        window.location.reload(true)
    }

    // call express API server on port 5051 (post) to delete post
    const APIDelete = () => {
        Axios.post('http://localhost:5051/api/deletePost', {id: postId})
        history.push(`/posts`);
    }

    return (
        <div className="PostContainer">
            <div clasName="PostContent">
                { detailsList.map((val, key) => {
                    return (
                        <div className="post">
                            <h1 className="posttitle">{val.title} hosted by {author = val.author}</h1>
                            <h2 className="locationtime">{val.location} @ {val.scheduledtime.split('T')[0]}</h2>
                            <p className="body">{val.body}</p>
                            <br></br>
                        </div>
                    )})
                }
                { username === author ? <button className="edit" onClick= {() => {(history.push(`/updatepost/${postId}`))}}>Edit Post</button> : <br></br> }
                { username === author ? <button className="delete" onClick= { APIDelete }>Delete Post</button> : <p></p> }
                <h2 className="click-able" onClick= {() => {(history.push(`/posts`))}}>Go Back</h2>
            </div>
            <div className="CommentContainer">
                <h2>Comments</h2>
                <textarea id="textbox" placeholder="Leave a comment!" onChange = { (e) => {setMessage(e.target.value)}}/>
                <br></br>
                <button onClick = { APIPost }>Post Comment</button>
                { commentsList.map((val, key) => {
                    return (
                        <div className="Comment">
                            <p className="commentmsg">{val.message}<br></br><b>{val.username} @ {val.timestamp}</b></p>
                        </div>
                    )})
                }
            </div>
        </div>
    );
}

export default Post
