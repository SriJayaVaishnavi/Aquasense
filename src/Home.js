// Home.js
import React from 'react';

const Home = () => {
    return (
        <div style={{ textAlign: 'center', margin: '20px', padding: '20px' }}>
            <h1 style={{ fontSize: '2.5em', marginBottom: '10px' }}>Welcome to AquaSense</h1>
            <h3 style={{ fontSize: '1.8em', marginBottom: '20px' }}>Your trusted partner</h3>
            <p style={{
                fontSize: '18px',
                lineHeight: '1.6',
                maxWidth: '600px',
                margin: '0 auto',
                backgroundColor: '#f0f8ff', // Light background color
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' // Subtle shadow for depth
            }}>
                AquaSense is dedicated to providing real-time monitoring and analysis of water quality, 
                ensuring that you have access to clean and safe water. Our innovative platform uses 
                advanced sensors to track TDS and turbidity levels, delivering accurate data and 
                insights right to your fingertips. Join us in our mission to promote water safety and 
                sustainability. With AquaSense, you can monitor your water quality from anywhere, 
                receive instant alerts on water quality changes, and gain peace of mind knowing your 
                health and safety are our top priorities. Embrace the future of water management with 
                AquaSense today!
            </p>
        </div>
    );
};

export default Home;
