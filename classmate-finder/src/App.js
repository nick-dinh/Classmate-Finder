import './App.css';
import Header from './components/Header';
import Profile from './components/user/Profile';
import Chat from './components/communication/Chat';
import Login from './components/user/Login';
import SignUp from './components/user/SignUp';
import { AuthContext } from './AuthContext';
import { useState, useEffect } from 'react';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [authState, setAuthState] = useState(false)

  useEffect(() => {
    if(localStorage.getItem('accessToken')){
      setAuthState(true)
    }
  }, [])

  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
      <Router>
      <Header/>
       <Routes>
         <Route path="/chat" element={<Chat/>}></Route>
         <Route path="/profile/:id" element={<Profile/>}></Route>
         <Route path="/login" element={<Login/>}></Route>
         <Route path="/signup" element={<SignUp/>}></Route>
       </Routes>
     </Router>
     </AuthContext.Provider>
    </div>
  );
}

export default App;
