import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../utils/firebase';
import { changeUserEmail, loginUser, registerUser } from './authenticatorService';
import getUserDetails from './userDetails';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [currentUserDetails, setCurrentUserDetails] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const userDetails = await getUserDetails(user.email);
                setCurrentUser(user);
                setCurrentUserDetails(userDetails);
            } else {
                setCurrentUser(null);
                setCurrentUserDetails({});
            }
            setLoading(false); 
        });
        return unsubscribe;
    }, []);

    const login = async (email, password) => {
        const userCredentials = await loginUser(email, password);
        const user = userCredentials.user;
        const userDetails = await getUserDetails(user.email);
        setCurrentUser(user);
        setCurrentUserDetails(userDetails);
        return userCredentials;
    };

    const register = async (email, password) => {
        const userCredentials = await registerUser(email, password);
        const user = userCredentials.user;
        const userDetails = await getUserDetails(user.email);
        setCurrentUser(user);
        setCurrentUserDetails(userDetails);
        return userCredentials;
    };

    const changeEmail = (user, password, newEmail) => {
        return changeUserEmail(user, password, newEmail);
    };

    const logout = async () => {
        await auth.signOut();
        setCurrentUser(null);
        setCurrentUserDetails({});
    };

    const value = {
        currentUser,
        currentUserDetails,
        login,
        register,
        changeEmail,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading ? children : <div>Loading...</div>}
        </AuthContext.Provider>
    );
};
