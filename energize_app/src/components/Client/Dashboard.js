import React from "react"
import NavigationBar from "./NavigationBar"
import MapComp from "./MapComponent"
import {Container,Row,Col,Card} from 'react-bootstrap'
export default function Dashboard() {
  return (
    <>
      <NavigationBar />
      <Container>
        <Row className="mt-3">
        <div className="col d-flex justify-content-center">
          <h2 >
            <b>Map of Hubs</b></h2>
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
