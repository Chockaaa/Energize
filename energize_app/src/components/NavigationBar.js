import React from 'react';
import {Nav,Navbar,Container} from 'react-bootstrap';


const NavigationBar=()=>{

    return (
        <Navbar bg="light" expand="lg" style={{fontSize:"1.5rem"}}>
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
                <Nav.Link href="/Profile">User Profile</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
            
        );
    }


export default NavigationBar;