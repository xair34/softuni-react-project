import { useEffect, useState } from "react";
import { useAuth } from "../../services/authContext";
import { useNavigate } from "react-router-dom";
import ChangeEmail from "./change-email/ChangeEmail";
import AvatarUpdate from "./avatar-update/AvatarUpdate";


export default function UserProfile() {

    const { currentUser, logout, currentUserDetails } = useAuth();
    const [currentUserAvatar, setCurrentUserAvatar] = useState(currentUserDetails.userAvatar);

    const handleUserAvatarChanged = (newUrl) =>{
        setCurrentUserAvatar(newUrl)
    }
    const navigate = useNavigate(); 

    
    return (
        <div>
            {
                currentUser ? (
                    <>
                        <h1>Welcome, {currentUserDetails.username}</h1>
                        <img src={currentUserDetails.userAvatar} alt="" width={'128px'} height={'128px'}/>
                        <AvatarUpdate onAvatarUpdate={handleUserAvatarChanged}/>
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