import { useEffect, useState } from "react";
import { useAuth } from "../../services/authContext";
import { useNavigate } from "react-router-dom";
import ChangeEmail from "./change-email/ChangeEmail";
export default function UserProfile() {

    const { currentUser, logout, currentUserDetails } = useAuth();
    const navigate = useNavigate(); 

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        }
        catch (error) {
            console.error('Unable to logout at this time', error);
        }
    }
    return (
        <div>
            {
                currentUser ? (
                    <>
                        <h1>Welcome, {currentUserDetails.username}</h1>
                        <button onClick={handleLogout}>Logout</button>
                        <ChangeEmail currentUserEmail={currentUserDetails.email} currentUserPassowrd={currentUser}/>
                    </>) : (
                    <>
                        <p>Loading...</p>
                    </>
                )
            }
        </div>
    );
}