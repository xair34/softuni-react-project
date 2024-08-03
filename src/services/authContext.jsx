import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../utils/firebase';
import { changeUserEmail, loginUser, registerUser } from './authenticatorService';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        });
        return unsubscribe;
    }, []);

    const login = (email, password) => {
        return loginUser(email, password);
    };

    const register = (email, password) => {
        return registerUser(email, password);
    };

    const changeEmail = (user, password, newEmail) => {
        return changeUserEmail(user, password, newEmail)
    }


    const logout = () => {
        return auth.signOut();
    };

    const value = {
        currentUser,
        login,
        register,
        changeEmail,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
