import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const NavigationBar = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <Navbar bg="light" expand="lg" style={{ fontSize: "1.2rem" }}>
      <Container>
        <Navbar.Brand href="/">
          Energize
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/Book">Book a Hub</Nav.Link>
            <Nav.Link href="/Transactions">Transactions</Nav.Link>
            <Nav.Link href="/SolarPanels">Buy/Rent Solar Panels</Nav.Link>
          </Nav>
          <>
            <Button variant="outline-light" onClick={handleShow}>
            <img
            src="./logo.jpg"
            width="30"
            height="30"
            class="d-inline-block align-top"
            alt=""
          />
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title >User Info</Modal.Title>
              </Modal.Header>
              <Modal.Body>{currentUser.email}</Modal.Body>
              <Modal.Footer>
                {error && <Alert variant="danger">{error}</Alert>}
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleLogout}>
                  Log Out
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
