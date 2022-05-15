import React from "react";
import NavigationBar from "./NavigationBar";
import { Container, Card } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SolarPanel = () => {
  return (
    <>
      <NavigationBar />
      <Container>
        <Row className="mx-auto my-5">
          <div className="col d-flex justify-content-center">
            <h1>Solar Panels</h1>
          </div>
        </Row>
        <Row xs={2} className="mx-auto my-6">
          <Col>
            <Card>
              <Card.Header>Buy or Rent Solar Panels</Card.Header>
              <Card.Body>
                <Col></Col>
                <Col>
                <a target="_blank" rel="noopener noreferrer" href="https://www.google.com/search?q=buy+solar+panel">
                  <img
                    src="/images/BuySolar.jpg"
                    width="100%"
                    height="100%"
                    className="rounded mx-auto d-block"
                    alt=""
                    
                  /></a>
                </Col>
                <Col></Col>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Header>Contact for Technical Support</Card.Header>
              <Card.Body>
                <Col></Col>
                <Col >
                <a target="_blank" rel="noopener noreferrer" href="https://www.google.com/search?q=technical+support+for+solar+panel">
                  <img
                    src="/images/repair.png"
                    width="80%"
                    height="80%"
                    className="rounded mx-auto d-block"
                    alt=""
                  />
                  </a>
                </Col>
                <Col></Col>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SolarPanel;
