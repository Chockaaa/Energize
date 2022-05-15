import React, { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import { Card, Button, Modal, Row, Container, Spinner } from "react-bootstrap";
import { Typography } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { getPackages } from "../../db/PackagesDB";
import { updateUserCreditBalance } from "../../db/UsersDB";
import { useAuth } from "../../contexts/AuthContext";

const BuyCredits = () => {
  const [packages, setPackages] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedPackage, setSelectPackage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const { currentUser } = useAuth();

  function compare(a, b) {
    if (a.credits < b.credits) return -1;
    if (a.credits > b.credits) return 1;
    return 0;
  }

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  function handlePay(updateAmount) {
    setLoading(true);
    updateUserCreditBalance(currentUser.email, updateAmount).then((_) => {
      setTimeout(() => {
        setLoading(false);
        setPaymentDone(true);
      }, 2000);
    });
  }

  document.getElementsByClassName("btn-close")[0]?.addEventListener("click", function() {
    setSelectPackage(null);
    setPaymentDone(false);
  })

  useEffect(() => {
    getPackages().then((res) => {
      const packagesArray = [];
      for (let i in res) {
        const doc = res[i].data();
        doc.id = res[i].id;
        packagesArray.push(doc);
      }
      setPackages([...packagesArray].sort(compare));
    });
  }, []);
  return (
    <>
      <NavigationBar />
      <div className="d-flex justify-content-center align-content-center mt-5">
        {packages.map((p) => (
          <Card className="mx-3 mt-5 text-center" key={p.id}>
            <Card.Img variant="top" src="logo.jpg" />
            <Card.Body>
              <Card.Title>{p.credits} credits</Card.Title>
              <Button
                variant="primary"
                onClick={() => {
                  setShow(true);
                  setSelectPackage(p);
                }}
              >
                Buy
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Payment</Modal.Title>
        </Modal.Header>
        {loading ? (
          <Modal.Body>
            <Spinner animation="border" role="status" style={{ position: 'relative', top: '50%', left: '50%' }}>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Modal.Body>
        ) : (
          <Modal.Body>
            {paymentDone ? (
              <Container>
              <CheckCircleIcon style={{ color: "green", fontSize: '5rem', position: 'relative', top: '50%', left: '40%' }} />
              <Row className="mx-auto my-3">
                  <Typography
                    sx={{ letterSpacing: 2, fontFamily: "default" }}
                    variant="h5"
                    align="center"
                  >
                    Payment completed
                  </Typography>
                </Row>
              </Container>
            ) : (
              <Container>
                <Row className="mx-auto my-3">
                  <Typography
                    sx={{ letterSpacing: 2, fontFamily: "default" }}
                    variant="h5"
                    align="center"
                  >
                    Credits: {selectedPackage?.credits}
                  </Typography>
                </Row>
                <Row className="mx-auto my-3">
                  <Typography
                    sx={{ letterSpacing: 2, fontFamily: "default" }}
                    variant="h5"
                    align="center"
                  >
                    Amount:{" "}
                    {formatter.format(
                      selectedPackage?.credits /
                        selectedPackage?.currencyToCredits
                    )}
                  </Typography>
                </Row>
                <Row className="mx-auto my-3">
                  <Typography
                    sx={{ letterSpacing: 2, fontFamily: "default" }}
                    variant="h5"
                    align="center"
                  >
                    <Button onClick={() => handlePay(selectedPackage.credits)}>
                      Pay now
                    </Button>
                  </Typography>
                </Row>
              </Container>
            )}
          </Modal.Body>
        )}
      </Modal>
    </>
  );
};

export default BuyCredits;
