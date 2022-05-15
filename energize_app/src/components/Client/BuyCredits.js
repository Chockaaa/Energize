import React, { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import { Card, Button, Modal, Row, Container, Spinner } from "react-bootstrap";
import { Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { getPackages } from "../../db/PackagesDB";
import { updateUserCreditBalance } from "../../db/UsersDB";
import { useAuth } from "../../contexts/AuthContext";
import CreditsIcon from "../../components/CreditsIcon";

const BuyCredits = () => {
  const [packages, setPackages] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedPackage, setSelectPackage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const { currentUser } = useAuth();

  const CARD_COLORS = [
    "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(205,127,50,1) 70%)",
    "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(192,192,192,1) 70%)",
    "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(212,175,55,1) 70%)",
    "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(80,200,120,1) 70%)",
    "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(185,242,255,1) 70%)",
  ];

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

  document
    .getElementsByClassName("btn-close")[0]
    ?.addEventListener("click", function () {
      setSelectPackage(null);
      setPaymentDone(false);
    });

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
      <h1 className="text-center font-weight-bold mt-5">Credit Packages</h1>
      <div className="d-flex justify-content-center align-content-center">
        {packages.map((p, index) => (
          <Card
            className="mx-3 mt-5 text-center"
            key={p.id}
            style={{ width: "250px" }}
          >
            <Card.Header>
              {Array(index + 1).fill(<CreditsIcon />)}
            </Card.Header>
            <Card.Body style={{ background: CARD_COLORS[index] }}>
              <Card.Title style={{ fontSize: "4rem", color: "#f8f8ff" }}>
                {p.credits}
              </Card.Title>
              <Card.Title style={{ fontSize: "2rem", color: "#f8f8ff" }}>
                credits
              </Card.Title>
            </Card.Body>
            <Card.Footer
              onClick={() => {
                setShow(true);
                setSelectPackage(p);
              }}
              style={{ cursor: "pointer" }}
            >
              <strong>Purchase</strong>
            </Card.Footer>
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
            <Spinner
              animation="border"
              role="status"
              style={{ position: "relative", top: "50%", left: "50%" }}
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Modal.Body>
        ) : (
          <Modal.Body>
            {paymentDone ? (
              <Container>
                <CheckCircleIcon
                  style={{
                    color: "green",
                    fontSize: "5rem",
                    position: "relative",
                    top: "50%",
                    left: "40%",
                  }}
                />
                <Row className="mx-auto my-3">
                  <Typography
                    sx={{ letterSpacing: 2, fontFamily: "default" }}
                    variant="h5"
                    align="center"
                  >
                    Payment completed
                  </Typography>
                </Row>
                <Row className="mx-auto my-3">
                  <Typography
                    sx={{ letterSpacing: 2, fontFamily: "default" }}
                    variant="h6"
                    align="center"
                  >
                    {selectedPackage.credits} <CreditsIcon /> has been added to
                    your account
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
