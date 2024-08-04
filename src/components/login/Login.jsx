import { Link, useNavigate, useNavigation } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import {useAuth} from '../../services/authContext';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.currentTarget.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.currentTarget.value);
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
       
        try{
            await login(username,password);
            navigate('/profile');
        }
        catch(error){
            console.error(error);
        }
    }
    
    return (
        <Form className="form login-form" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Email" onChange={handleUsernameChange} value={username} required autoComplete="true"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} value={password} required autoComplete="true"/>
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