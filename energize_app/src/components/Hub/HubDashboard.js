import React, { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import { Container, Card, Button, Modal, Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useAuth } from "../../contexts/AuthContext";

import { updateUserCreditBalance } from "../../db/UsersDB";

export default function HubDashboard() {
  const [buyshow, buysetShow] = useState(false);

  const buyhandleClose = () => buysetShow(false);
  const buyhandleShow = () => buysetShow(true);
  const [sellshow, sellsetShow] = useState(false);

  const sellhandleClose = () => sellsetShow(false);
  const sellhandleShow = () => sellsetShow(true);

  return (
    <>
      <NavigationBar />
      <Container>
        <Row className="mx-auto my-5">
          <div className="col d-flex justify-content-center">
            <h1>Energy Hub Services</h1>
          </div>
        </Row>
        <Row sm={1} lg={2} style={{ marginTop: "4rem", marginBottom: "6rem" }}>
          <Col>
            <Card border="primary" style={{ width: "32rem", height: "18rem" }}>
              <Card.Body>
                <Button
                  onClick={buyhandleShow}
                  style={{
                    width: "97%",
                    height: "95%",
                    textAlign: "center",
                    fontFamily: "monospace",
                    textTransform: "uppercase",
                    fontSize: "2.4em",
                  }}
                  variant="success"
                >
                  Buy Electricity
                </Button>{" "}
                <Modal
                  size="lg"
                  show={buyshow}
                  onHide={buyhandleClose}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Buy Electricity</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                          We'll never share your email with anyone else.
                        </Form.Text>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        <Form.Check type="checkbox" label="Check me out" />
                      </Form.Group>
                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={buyhandleClose}>
                      Close
                    </Button>
                    <Button variant="primary">Start Transaction</Button>
                  </Modal.Footer>
                </Modal>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card border="primary" style={{ width: "32rem", height: "18rem" }}>
              <Card.Body>
                <Button
                  onClick={sellhandleShow}
                  style={{
                    width: "97%",
                    height: "95%",
                    textAlign: "center",
                    fontFamily: "monospace",
                    textTransform: "uppercase",
                    fontSize: "2.4rem",
                  }}
                  variant="danger"
                >
                  Sell Electricity
                </Button>{" "}
                <Modal
                  size="lg"
                  show={sellshow}
                  onHide={sellhandleClose}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Sell Electricity</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group as={Row} className="mb-3" controlId="hubID">
                        <Form.Label column sm="2">
                          Hub ID
                        </Form.Label>
                        <Col sm="10">
                          {" "}
                          <Form.Control
                            type="number"
                            placeholder="Enter Hub Id"
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="energyAmount"
                      >
                        <Form.Label column sm="2">
                          Energy
                        </Form.Label>
                        <Col sm="10">
                          {" "}
                          <Form.Control
                            type="number"
                            placeholder="Amount Energy Sold"
                          />
                          <Form.Text>Conversion Rate: 0.2 x Energy </Form.Text>
                        </Col>
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={sellhandleClose}>
                      Close
                    </Button>
                    <Button variant="primary">Start Transaction</Button>
                  </Modal.Footer>
                </Modal>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
