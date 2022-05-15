import React from "react";
import NavigationBar from "./NavigationBar";
import { Container, Card } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function BuySell() {
  return (
    <>
      <NavigationBar />
      <Container >
        <Row className="mx-auto my-5">
          <div className="col d-flex justify-content-center">
            <h1>Energy Hub Services</h1>
          </div>
        </Row>
        <Row xs={1} md={2} className="g-4" style={{marginTop:"4rem", marginBottom:"6rem"}}>
          <Col>
            <Card border="primary" style={{ width: "32rem", height: "18rem" }}>
              <Card.Body>
                <Card.Title style={{textAlign:"center", fontFamily:"monospace",textTransform:"uppercase"}}>Buy Electricity</Card.Title>
                
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card border="primary" style={{ width: "32rem", height: "18rem" }}>
              <Card.Body>
                <Card.Title style={{textAlign:"center", fontFamily:"monospace",textTransform:"uppercase"}}>Sell Electricity</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
