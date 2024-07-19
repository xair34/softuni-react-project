import { Link } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";

export default function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.currentTarget.value);
    }

    const handleUsernameChange = (e) => {
        setUsername(e.currentTarget.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.currentTarget.value);
    }

    const handleConfirmPasswordChange = (e) =>{
        setConfirmPassword(e.currentTarget.value);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(username);
        console.log(email);
        console.log(password);
        console.log(confirmPassword);
    }
    return (
        <Form className="form register-form" onSubmit={handleSubmit}>
             <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username" onChange={handleUsernameChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange}/>
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirm-password">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={handleConfirmPasswordChange}/>
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