import React, { useEffect, useState } from "react";
import NavigationBar from "./NavigationBar";
import { Button, Form } from "react-bootstrap"
import { Outlet, useParams } from "react-router-dom";

const Booking = () => {
  const hubSelected = useParams()
  useEffect(() => {
    console.log(hubSelected)
  })

  return (
    <>
      <NavigationBar />
      {hubSelected ?
        //form with preselected hub
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form> :
        //fresh form
        null
      }
      <Outlet></Outlet>
    </>
  );
};

export default Booking;
