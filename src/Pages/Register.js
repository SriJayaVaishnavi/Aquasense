import React, { useState } from 'react';
import { auth, database } from '../firebase.js'; // Ensure this path is correct
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
//import './style.css'; // Make sure to import your CSS file


const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [waterPurifierID, setWaterPurifierID] = useState('');
    const [error, setError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);


    const handleRegister = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous error


        try {
            // Register the user with Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user; // Get the user object


            // Now store additional user data in Realtime Database
            await set(ref(database, 'Users/' + user.uid), {
                email,
                waterPurifierID,
            });


            alert('Registration successful!'); // Show success message


            // Optionally reset the form fields
            setEmail('');
            setPassword('');
            setWaterPurifierID('');
        } catch (error) {
            setError('Error registering user: ' + error.message); // General error handling
        }
    };


    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };


    return (
        <div className="container">
           <h2 style={{ textAlign: 'center' }}>Register</h2>
            <form onSubmit={handleRegister}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="password">Password:</label>
                <div className="password-container">
                    <input
                        type={passwordVisible ? 'text' : 'password'}
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="button" onClick={togglePasswordVisibility}>
                        {passwordVisible ? 'Hide' : 'Show'}
                    </button>
                </div>
                <label htmlFor="waterPurifierID">Water Purifier ID:</label>
                <input
                    type="text"
                    id="waterPurifierID"
                    placeholder="Water Purifier ID"
                    value={waterPurifierID}
                    onChange={(e) => setWaterPurifierID(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
                {error && <p className="alert error">{error}</p>}
            </form>
        </div>
    );
};


export default Register;


