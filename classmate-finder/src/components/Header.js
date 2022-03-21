import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'


const Header = () => {
    return (
        <div className = "header">
            <h1>Classmate Finder</h1>
           
            <div className="links"> 
                <Link to="/profile">Profile</Link>
                <Link to="/chat">Chat</Link>
            </div>
        </div>
    )
}

export default Header