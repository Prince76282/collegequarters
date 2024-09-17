// LogoutButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase.config'; // Import Firebase auth
import { signOut } from 'firebase/auth';

function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth); // Sign out from Firebase
            localStorage.removeItem('authToken'); // Clear token
            localStorage.removeItem('userId'); // Clear user ID
            navigate('/login'); // Redirect to login page
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
}

export default LogoutButton;
