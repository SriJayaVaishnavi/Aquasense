import React, { useState } from 'react';
import { auth } from '../firebase.js'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { database } from '../firebase.js'; 
import { ref, get } from 'firebase/database'; 
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate(); // Initialize navigate

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); 

        try {
            // Sign in the user with Firebase Authentication
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user; // Get the user object

            
            const userRef = ref(database, 'Users/' + user.uid); // Get reference to the user in the database
            const snapshot = await get(userRef); // Fetch the user data from the database

            if (snapshot.exists()) {
                const userData = snapshot.val(); // Get the user data
                console.log('User data:', userData); // Log user data for debugging

                // You can access user's waterPurifierID like this:
                const waterPurifierID = userData.waterPurifierID;

                // Navigate to temp.js after successful login
                navigate('/temp'); // Adjust the path based on your routing

                alert('Login successful!'); // Show success message
            } else {
                setError('No user data found in the database.');
            }
        } catch (error) {
            setError('Error logging in: ' + error.message); // Display error message
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="container">
            <h2 style={{ textAlign: 'center' }}>Login</h2>
            <form onSubmit={handleLogin}>
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
                <button type="submit">Login</button>
                {error && <p className="alert error">{error}</p>} {/* Display error message */}
            </form>
        </div>
    );
};

export default Login;
