import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

import axios from 'axios'

const Profile = () => {
  let {id} = useParams();
  const [username, setUsername] = useState("");

  useEffect (() => {
    axios.get(`http://localhost:3001/users/basicinfo/${id}`).then((response)=>{
      setUsername(response.data.username);
    })
  }, [])

  return (
    <div className="profile">
      <div className="basicInfo">
        <h1>Username: {username}</h1>
        
      </div>
      
    </div>
  )
}

export default Profile