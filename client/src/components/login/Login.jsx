import { Link } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";


export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) =>{
        setUsername(e.currentTarget.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.currentTarget.value);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();

        console.log(username);
        console.log(password);
    }

    return (
        <Form className="form register-form" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username" onChange={handleUsernameChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange}/>
            </Form.Group>
            <Button variant="secondary" type="submit" className="btn-center m-3">
                Login
            </Button>
            <div>
                Don't have an account yet? Sing-up <Link to="/register">here</Link>
            </div>
        </Form>
    );
}