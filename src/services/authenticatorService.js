import { createUserWithEmailAndPassword, reauthenticateWithCredential, sendEmailVerification, signInWithEmailAndPassword, updateEmail } from "firebase/auth"
import { auth } from "../utils/firebase"
import { EmailAuthProvider } from "firebase/auth/web-extension";

export const registerUser = async(email,password) =>{
    try{
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        return userCredentials;
    }catch(error){
        console.error("Error registering user: ", error);
        throw error;
    }
}

export const loginUser = async(email,password) =>{
    try{
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        return userCredentials;
    }
    catch(error){
        console.error("Error logging in:", error);
        throw error;
    }
}


export const changeUserEmail = async(user, password, newEmail) =>{
    try{
        const credential = EmailAuthProvider.credential(user.email, password);
        await reauthenticateWithCredential(user,credential);
        await updateEmail(user, newEmail);
        await sendEmailVerification(user);
        return user;
    }
    catch(error){
        console.error(error);
        throw error;
    }
}