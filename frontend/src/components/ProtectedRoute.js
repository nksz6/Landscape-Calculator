import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

//This component will wrap our protected views
function ProtectedRoute({ children }) {
    const { user } = useAuth();

    if (!user) {
        //if user is not logged in, redirect them to the /login view
        return <Navigate to="/login" />;
    }

    //if the user is logged in, render the child component (the protected view)
    return children;
}

export default ProtectedRoute;