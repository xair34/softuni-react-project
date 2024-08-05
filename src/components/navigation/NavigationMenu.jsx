import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../services/authContext';

export default function NavigationMenu() {
    const { currentUser, logout } = useAuth();
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
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/">Game Discussion Forum</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        {currentUser ?
                            (
                                <>
                                    <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                                    <button onClick={handleLogout} className='nav-link'>Logout</button>
                                </>
                            ) : (<Nav.Link as={Link} to="/login">Login</Nav.Link>)}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}