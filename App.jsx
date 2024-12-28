import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './Home.css'; 
import './AuthForm.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from "./Signup";
import Signin from "./Signin";
import Home from "./Home";
import Playlist from "./Playlist";

const App = () => {
  const [userEmail, setUserEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add state for login status

  return (
    <Router>
      <Routes>
        <Route 
          path="/Signin" 
          element={<Signin setUserEmail={setUserEmail} setIsLoggedIn={setIsLoggedIn} />} 
        />
        <Route 
          path="/" 
          element={<Signup setIsLoggedIn={setIsLoggedIn} />} 
        />
        <Route 
          path="/home" 
          element={<Home userEmail={userEmail} />} 
        />
        <Route 
          path="/playlist" 
          element={<Playlist setIsLoggedIn={setIsLoggedIn} />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
