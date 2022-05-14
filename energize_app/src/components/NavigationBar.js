import React, { useState }  from 'react';
import { useAuth } from "../contexts/AuthContext"
import { Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { Nav,Navbar,Container,NavDropdown} from 'react-bootstrap';


const NavigationBar=()=>{

    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()
  
    async function handleLogout() {
      setError("")
  
      try {
        await logout()
        navigate("/login")
      } catch {
        setError("Failed to log out")
      }
    }
  

    return (
        <Navbar bg="light" expand="lg" style={{fontSize:"1.2rem"}}>
        <Container>
            <Navbar.Brand href="/"><img src="./logo.jpg" width="30" height="30" class="d-inline-block align-top" alt=""/>&nbsp;&nbsp;Energize</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/Book">Book a Hub</Nav.Link>
                <Nav.Link href="/Transactions">Transactions</Nav.Link>
                <Nav.Link href="/SolarPanels">Buy/Rent Solar Panels</Nav.Link>               
            </Nav>
            <Nav>
            <NavDropdown title={currentUser.email} id="basic-nav-dropdown">
                <Nav.Link href="/Profile">Profile</Nav.Link>
                {error && <Alert variant="danger">{error}</Alert>}
                <Nav.Link href="#" onClick={handleLogout}>Log Out</Nav.Link>
            </NavDropdown>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
            
        );
    }


export default NavigationBar;