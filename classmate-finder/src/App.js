import './App.css';
import Header from './components/Header';
import Profile from './components/user/Profile';
import Chat from './components/communication/Chat';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      
      <Router>
      <Header/>
       <Routes>
         <Route path="/chat" element={<Chat/>}></Route>
         <Route path="/profile" element={<Profile/>}></Route>
       </Routes>
     </Router>
   
    </div>
  );
}

export default App;
