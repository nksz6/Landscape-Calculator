// In src/components/GuestRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// This component will wrap our guest-only views (Login, Registration)
function GuestRoute({ children }) {
    const { user } = useAuth();

    if (user) {
        // If the user IS logged in, don't show them the guest page.
        // Instead, redirect them to the home/dashboard page.
        return <Navigate to="/home" />;
    }

    // If the user is NOT logged in (i.e., they are a guest),
    // render the child component they were trying to access (the Login or Registration page).
    //yep
    return children;
}

export default GuestRoute;