import React, { useState } from "react"
import { Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import NavigationBar from "./NavigationBar"

export default function Profile() {
  const [error, setError] = useState("")
  const { currentUser } = useAuth()

  return (
    <>
    <NavigationBar/>
    <div className="col d-flex justify-content-center">
            <h1>Temporary Profile Page</h1>
        </div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
        </Card.Body>
      </Card>
    </>
  )
}
