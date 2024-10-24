import NavBar from './NavBar.js';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Pages/Register.js'; // Adjust the path accordingly
import WaterQualityMonitor from './Pages/WaterQualityMonitor.js'; // Adjust the path accordingly
import Temp from './temp.js'; // Adjust the path accordingly
import Login from './Pages/Login.js';
import Home from './Home.js'; // Import the new Home component
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
