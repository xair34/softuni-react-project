import {Route, Navigate, useLocation} from 'react-router-dom';
import {useAuth} from '../../services/authContext';
import { Component } from 'react';

export default function ProtectedRoute({
    element: Component, ...rest
}) {
    const { currentUser } = useAuth();
    const location = useLocation();

    if(!currentUser){
        return <Navigate to="/login" state={{from: location}}/>;
    }
    return <Component {...rest}/>
};