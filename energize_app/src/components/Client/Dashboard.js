import React from "react"
import NavigationBar from "./NavigationBar"
import MapComp from "./MapComponent"
import {Container,Row,Col,Card} from 'react-bootstrap'
export default function Dashboard() {
  return (
    <>
      <NavigationBar />
      <Container>
        <Row>
        <div className="col d-flex justify-content-center">
          <h2>Map of Hubs</h2>
        </div>
        </Row>
        <Row>
          <Card>
          <MapComp></MapComp>
          </Card>
        </Row>
      </Container>
      
    
    </>
    
  )
}
