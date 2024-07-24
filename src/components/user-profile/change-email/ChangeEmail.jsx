import { Link } from 'react-router-dom';
import { useState } from "react";
import { useAuth } from '../../../services/authContext';
import { useNavigate } from 'react-router-dom';
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export default function ChangeEmail({
    currentUserEmail,
    currentUserPassowrd
}) {
    const { currentUser, changeEmail } = useAuth();
    const [currentEmail, setCurrentEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const handleCurrentEmailChange = (e) => {
        setCurrentEmail(e.currentTarget.value);
    }

    const handleNewEmailChange = (e) => {
        setNewEmail(e.currentTarget.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.currentTarget.value);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentEmail !== currentUserEmail) {
            setError('The entered current email does not match your current email.');
            return;
        }
        const credential = EmailAuthProvider.credential(currentUserEmail, password);
        try {
            await reauthenticateWithCredential(currentUser,credential);
            await changeEmail(currentUser, password, newEmail);
            setCurrentEmail('');
            setNewEmail('');
            setPassword('');
            setError('');
            navigate('/profile');
        } catch (error) {
            setError('Invalid password. Please try again.');
        }
    }

    return (
        <div>
            <h3>Change email address</h3>
            {error && <div className="error">{error}</div>}
            <Form className="form login-form" >
                <Form.Group className="mb-3" controlId="current-email">
                    <Form.Label>Confirm current email</Form.Label>
                    <Form.Control type="email" placeholder="Current Email" required onChange={handleCurrentEmailChange} value={currentEmail} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="new-email">
                    <Form.Label>New email</Form.Label>
                    <Form.Control type="email" placeholder="New Email" required onChange={handleNewEmailChange} value={newEmail} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" required onChange={handlePasswordChange} value={password} />
                </Form.Group>

                <Button variant="secondary" type="submit" className="btn-center m-3" onClick={handleSubmit}>
                    Update email
                </Button>
            </Form>
        </div>
    );
}