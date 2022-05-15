import React, { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import { Container, Card, Button, Modal, Form, Offcanvas } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { updateUserCreditBalance } from "../../db/UsersDB";
import { useAuth } from "../../contexts/AuthContext";
import { addTransaction, getPendingTransactionsByEmail } from "../../db/TransactionsDB";
import { getHubFromName, updateHubEnergyCapacity } from "../../db/HubsDB";
import TransactionsTable from "./TransactionsTable";

export default function HubDashboard() {
  const [buyshow, buysetShow] = useState(false);

  const buyhandleClose = () => buysetShow(false);
  const buyhandleShow = () => buysetShow(true);
  const [sellshow, sellsetShow] = useState(false);

  const sellhandleClose = () => sellsetShow(false);
  const sellhandleShow = () => sellsetShow(true);

  const { currentUser } = useAuth();
  const currentDate = new Date();
  const selectedHubName = localStorage["selectedHubName"];
  const [selectValue, setSelectValue] = useState(null);
  const [currToCred, setCurrToCred] = useState(10);
  const [currCap, setCurrCap] = useState(null);
  const [amt, setAmt] = useState("");
  const [convRate, setConvRate] = useState(0.2);
  const [docId, setDocId] = useState(0);


  const [showCanvas, setShowCanvas] = useState(false);

  const handleCloseCanvas = () => setShowCanvas(false);
  const handleShowCanvas = () => setShowCanvas(true);

  const [pendingTransactions,setPendingTransactions] =useState([])

  const handleChangeAmt = (value) => {
    try {
      if (parseInt(value) > parseInt(currCap) || parseInt(value) <= 0) {
        throw new Error("Invalid input");
      } else {
        setAmt(value);
      }
    } catch (e) {
      console.log("Invalid input, input out of available capacity range");
    }
  };

  const handleSelect = (val) => {
    setSelectValue(val);
  };

  function sellElectricity(updateAmount, e) {
    const data = {
      cost: amt * convRate,
      creditsEarned: 1 * currToCred * amt * convRate,
      dateCompleted: "",
      energyAmount: parseInt(amt),
      hubId: parseInt(docId),
      status: "Completed",
      transactionType: 1,
      userName: currentUser.email,
    };
    addTransaction(data);
    updateUserCreditBalance(currentUser.email, data.creditsEarned);
    updateHubEnergyCapacity(data.creditsEarned, data.hubId);
    sellsetShow(false);
    setAmt(0);
    setShowCanvas(true);
  }

  useEffect(() => {
    getPendingTransactionsByEmail(currentUser.email).then(res=>{
      const transactionsArray = [];
      for (let i in res) {
        const doc = res[i].data();
        doc.id = res[i].id;
        transactionsArray.push(doc);
      }
      setPendingTransactions([...transactionsArray]);
    })

  },[]);

  useEffect(() => {
    getHubFromName("Alpha").then((res) => {
      setCurrToCred(
        res[0]._delegate._document.data.value.mapValue.fields.currencyToCredits
          .integerValue
      );
      setCurrCap(
        res[0]._delegate._document.data.value.mapValue.fields.hubCurrentCapacity
          .integerValue
      );
      setConvRate(
        res[0]._delegate._document.data.value.mapValue.fields.wattsToCredits
          .doubleValue
      );
      setDocId(res[0].id);
    });
  }, []);

  useEffect(() => {
    if (selectValue != null) {
      getHubFromName(selectValue).then((res) => {
        setCurrToCred(
          res[0]._delegate._document.data.value.mapValue.fields
            .currencyToCredits.integerValue
        );
        setCurrCap(
          res[0]._delegate._document.data.value.mapValue.fields
            .hubCurrentCapacity.integerValue
        );
        setConvRate(
          res[0]._delegate._document.data.value.mapValue.fields.wattsToCredits
            .doubleValue
        );
        setDocId(res[0].id);
      });
    } else {
      setSelectValue(selectedHubName);
    }
  }, [selectValue]);

  return (
    <>
      <NavigationBar />
      {JSON.stringify(pendingTransactions)}
      <Container>
        <Row className="mx-auto my-5">
          <div className="col d-flex justify-content-center">
            <h1>Energy Hub Services</h1>
          </div>
        </Row>
        <Row sm={1} lg={2} style={{ marginTop: "4rem", marginBottom: "6rem" }}>
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
                  size="xl"
                  show={buyshow}
                  onHide={buyhandleClose}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Buy Electricity</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  <TransactionsTable transactions={pendingTransactions} />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={buyhandleClose}>
                      Close
                    </Button>
                    <Button variant="primary">Start Transaction</Button>
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
                    <Form>
                      <Form.Group as={Row} className="mb-3" controlId="hubID">
                        <Form.Label column sm="2">
                          Transaction Start
                        </Form.Label>
                        <Col sm="10">
                          {" "}
                          <Form.Control
                            type="number"
                            placeholder={currentDate}
                            disabled
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="mb-3" controlId="hubID">
                        <Form.Label column sm="2">
                          Hub ID
                        </Form.Label>
                        <Col sm="10">
                          {" "}
                          <Form.Control
                            as="select"
                            defaultValue={"Alpha"}
                            onChange={(e) => {
                              handleSelect(e.target.value);
                            }}
                          >
                            <option value={"Alpha"}>Alpha</option>
                            <option value={"Bravo"}>Bravo</option>
                            <option value={"Charlie"}>Charlie</option>
                            <option value={"Delta"}>Delta</option>
                          </Form.Control>
                        </Col>
                      </Form.Group>
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="energyAmount"
                      >
                        <Form.Label column sm="2">
                          Amount of Energy to Sell(W)
                        </Form.Label>
                        <Col sm="10">
                          {" "}
                          <Form.Control
                            type="number"
                            value={amt}
                            onChange={(e) => {
                              handleChangeAmt(e.target.value);
                            }}
                            placeholder="Amount of Energy Sold"
                          />
                          <Form.Text>Conversion Rate: 0.2 x Energy</Form.Text>
                        </Col>
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={sellhandleClose}>
                      Close
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => sellElectricity(5)}
                    >
                      Complete Transaction
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Offcanvas show={showCanvas} onHide={handleCloseCanvas}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Plug in Charger</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
      Charging Status
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
