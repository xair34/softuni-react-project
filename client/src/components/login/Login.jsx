import { Link } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export default function Login() {
    return (
        <Form className="form register-form">
            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username" />
            </Form.Group>
            

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
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