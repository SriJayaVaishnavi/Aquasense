import NavBar from './NavBar.js';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Pages/Register.js'; 
import WaterQualityMonitor from './Pages/WaterQualityMonitor.js'; 
import Temp from './temp.js'; 
import Login from './Pages/Login.js';
import Home from './Home.js'; 
import './App.css';
import './Style.css';

const App = () => {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/water-quality-monitor" element={<WaterQualityMonitor />} />
                <Route path="/temp" element={<Temp />} />
                <Route path="/" element={<Home />} /> {/* Set the root route to the Home component */}
            </Routes>
        </Router>
    );
};

export default App;
