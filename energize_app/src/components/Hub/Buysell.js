import React, { useState } from "react";
import NavigationBar from "./NavigationBar";
import { Container, Card, Button, Modal } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function BuySell() {
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
        <Row
          xs={1}
          md={2}
          className="g-4"
          style={{ marginTop: "4rem", marginBottom: "6rem" }}
        >
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
                    I will not close if you click outside me. Don't even try to
                    press escape key.
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={buyhandleClose}>
                      Close
                    </Button>
                    <Button variant="primary">Understood</Button>
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
                    I will not close if you click outside me. Don't even try to
                    press escape key.
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={sellhandleClose}>
                      Close
                    </Button>
                    <Button variant="primary">Understood</Button>
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
