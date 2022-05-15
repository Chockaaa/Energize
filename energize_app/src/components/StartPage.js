import React from 'react'
import { Image, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const StartPage = () => {
  const LOGO_SIZE = '250px'
  const navigate = useNavigate()

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Image
        src="./logo.jpg"
        roundedCircle
        className="m-5"
        style={{ height: LOGO_SIZE, width: LOGO_SIZE }}
      />
      <Button onClick={() => navigate("/login")}>Client</Button>
      <Button onClick={() => navigate("/hub/login")}>Hub</Button>
    </div>
  )
}

export default StartPage