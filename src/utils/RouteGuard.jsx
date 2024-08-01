import React from "react";

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../services/authContext";

export const isAuthenticated = () => {
    const {currentUser} = useAuth();
    return !!currentUser;
}

export const ProtectedRoutes = () =>{
    const location = useLocation();
    return isAuthenticated() ? <Outlet/> : <Navigate to='/login' state={{from: location}} replace/>;
}

export const PublicRoutes = () => {
    const location = useLocation();
    return !isAuthenticated() ? <Outlet/> : <Navigate to='profile' state={{from:location}} replace/>;
}