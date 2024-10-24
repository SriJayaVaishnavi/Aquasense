import React from 'react';
import { Link } from 'react-router-dom';
import './Style.css';

const NavBar = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/water-quality-monitor">Water Quality Monitor</Link></li>
                    <li><Link to="/temp">Report</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default NavBar;
