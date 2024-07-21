import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import {useAuth} from '../../services/authContext';
import { registerUser } from "../../services/authenticatorService";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const {navigate} = useNavigate();
    const {register} = useAuth();

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

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try{
            await registerUser(email,password);
            navigate('/login');
        }
        catch(err){
            console.error(err);
        }
        
    }
    return (
        <Form className="form register-form" onSubmit={handleSubmit}>
             <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username" onChange={handleUsernameChange} required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} required/>
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirm-password">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={handleConfirmPasswordChange} required/>
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