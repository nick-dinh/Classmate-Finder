import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import { AuthContext } from '../AuthContext'
import { useNavigate } from 'react-router-dom'



const Header = () => {
    let navigate = useNavigate()
    const {authState} = useContext(AuthContext)
    const {setAuthState} = useContext(AuthContext)

    const logout = () => {
        sessionStorage.removeItem("accessToken");
        setAuthState(false)
        navigate("/login", {replace: true});
    }

    return (
        <div className = "header">
            <h1>Classmate Finder</h1>
           
            <div className="links"> 
                <Link to="/chat">Chat</Link>
                <Link to="/profile">Profile</Link>
                {!authState ? (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Sign Up</Link>
                    </>
                ): (
                    <button onClick={logout}>Logout</button>
                )}
                
            </div>
        </div>
    )
}

export default Header