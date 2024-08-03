import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { useAuth } from '../../services/authContext';
import { registerUser } from "../../services/authenticatorService";
import { useNavigate } from "react-router-dom";
import { getCurrentFormattedDate } from "../../utils/dateFormatter";
import { db } from "../../utils/firebase";
import { get, ref, set } from "firebase/database";

import styles from './Register.module.css';

export default function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMesage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const { navigate } = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.currentTarget.value);
        setErrorMessage('');
    }

    const handleUsernameChange = (e) => {
        setUsername(e.currentTarget.value);
        setErrorMessage('');
    }

    const handlePasswordChange = (e) => {
        setPassword(e.currentTarget.value);
        setErrorMessage('');
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.currentTarget.value);
        setErrorMessage('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }
        try {
            const ordinaryUsersSnapshot = await get(ref(db, 'users/ordinary'));
            const ordinaryUsersData = ordinaryUsersSnapshot.val();
            const ordinaryUsernames = ordinaryUsersData ? Object.values(ordinaryUsersData).map(user => user.username) : [];

            const adminUsersSnapshot = await get(ref(db, 'users/admins'));
            const adminUsersData = adminUsersSnapshot.val();
            const adminUsersUsernames= adminUsersData ? Object.values(adminUsersData).map(user => user.username) : [];

            const allUsernames = [...ordinaryUsernames, ...adminUsersUsernames];

            if(allUsernames.includes(username)){
                setErrorMessage('Username or email already exists.');
                return;
            }

            const userCredentails = await registerUser(email, password);
            const user = userCredentails.user;
            const date = getCurrentFormattedDate();
            const userRef = ref(db, `users/ordinary/${user.uid}`);
            const userInfo = {
                id:{
                    username: username,
                    email: email,
                    profilePicture: "https://forum.lastepoch.com/uploads/default/original/1X/d160f95b987020dfc973fa21bd48f4fa884552f0.png",
                    dateJoined: date,
                    posts: []
                }
            }
            await set(userRef, userInfo);

            setSuccessMessage('Your account has been successfully created. You will now be redirected to the log in page.');
            setInterval(() => {
                navigate('/login');
            }, 2000);
        }
        catch (error) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setErrorMessage('User with this email or username already exists.');
                    break;
                case 'auth/invalid-email':
                    setErrorMessage(`Email address ${email} is invalid.`);
                    break;
                case 'auth/operation-not-allowed':
                    setErrorMessage(`Error during sign up.`);
                    break;
                case 'auth/weak-password':
                    setErrorMessage('Password is not strong enough. Add additional characters including special characters and numbers.');
                    break;
                default:
                    console.error('Failed to create account:', error.message);
                    break;
            }
        }

    }
    return (
        <Form className="form register-form" onSubmit={handleSubmit}>
            {successMessage != "" ? <div className={`${styles['success']} ${styles['message']}`}>{successMessage}</div> : ""}
            {errorMesage != "" ? <div className={`${styles['fail']} ${styles['message']}`}>{errorMesage}</div> : ""}
            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username" onChange={handleUsernameChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} required />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirm-password">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={handleConfirmPasswordChange} required />
            </Form.Group>
            <Button variant="secondary" type="submit" className="btn-center m-3">
                Submit
            </Button>

            <div>
                Already have an account? Login <Link to="/login">here</Link>
            </div>
        </Form>
    );
}