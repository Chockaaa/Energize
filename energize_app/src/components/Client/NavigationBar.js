import React, { useState,useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Nav, Navbar, Container, Button, Image } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Typography } from "@mui/material";
import { getUserInfo } from "../../db/UsersDB";
import CreditCardForm from "./CreditCardForm";

const NavigationBar = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showCreditCardForm, setShowCreditCardForm] = useState(false);

  const [userInfo, setUserInfo] = useState({
    userEmail: currentUser.email,
    credit: 0,
    creditCardNumber: null
  });

  
  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  useEffect(() => {
    getUserInfo(currentUser.email).then((res) => {
      let { creditBalance, creditCardInfo: { cardNumber } } = res;
      cardNumber = cardNumber.replace(/[^0-9]+/g, '');
      let l = cardNumber.length;
      cardNumber = cardNumber.substring(0,4) + "*".repeat(l-8) + cardNumber.substring(l-4,l);
      setUserInfo({ ...userInfo, credit: creditBalance, creditCardNumber: cardNumber });
    });
  }, [currentUser.email]);

  return (
    
    <Navbar bg="light" expand="lg" style={{ fontSize: "1.2rem" }}>
      <Container>
        <Navbar.Brand href="/">Energize</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/Book">Book a Hub</Nav.Link>
            <Nav.Link href="/Transactions">Transactions</Nav.Link>
            <Nav.Link href="/BuyCredits">Buy Credits</Nav.Link>
            <Nav.Link href="/SolarPanels">Buy/Rent Solar Panels</Nav.Link>
          </Nav>
          <>
            <Button variant="outline-light" onClick={() => setShow(true)}>
              <img
                src="/images/logo.jpg"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt=""
              />
            </Button>

            <Modal show={show} onHide={() => setShow(false)} centered backdrop="static" keyboard={false}>
              <Modal.Header closeButton>
                <Modal.Title>User Information</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container>
                  <Row>
                    <Col></Col>
                    <Col>
                      <Image src="images/profile.png" roundedCircle className="w-100"></Image>
                    </Col>
                    <Col></Col>
                  </Row>
                  <Row className="mx-auto my-3">
                    <Typography sx={{ letterSpacing: 2, fontFamily: 'default' }}  variant="h5" align="center">
                      {userInfo.userEmail}
                    </Typography>
                  </Row>
                  <Row className="mx-auto my-3">
                    <Typography sx={{ letterSpacing: 2, fontFamily: 'default' }} variant="h5" align="center">
                      Credits: {userInfo.credit}
                    </Typography>
                  </Row>
                  <Row className="mx-auto my-3">
                    <Typography sx={{ letterSpacing: 2, fontFamily: 'default' }} variant="h5" align="center">
                      {userInfo.creditCardNumber ? `Account number: ${userInfo.creditCardNumber}` : <Button onClick={() => {
                        setShow(false)
                        setShowCreditCardForm(true)
                      }}>Add Account</Button>}
                    </Typography>
                  </Row>
                </Container>
              </Modal.Body>
              <Modal.Footer className="d-flex justify-content-center">
                {error && <Alert variant="danger">{error}</Alert>}
                <Button variant="outline-danger" onClick={handleLogout}>
                  Log Out
                </Button>
              </Modal.Footer>
            </Modal>
            <Modal show={showCreditCardForm} onHide={() => setShowCreditCardForm(false)} size="lg" centered backdrop="static" keyboard={false}>
              <Modal.Header closeButton>
                <Modal.Title>Credit Card Information</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container>
                  <Row className="mx-auto my-3">
                    <Typography sx={{ letterSpacing: 2, fontFamily: 'default' }} variant="h5" align="center">
                      {showCreditCardForm && <CreditCardForm setShowCreditCardForm={setShowCreditCardForm} />}
                    </Typography>
                  </Row>
                </Container>
              </Modal.Body>
            </Modal>
          </>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
