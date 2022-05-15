import React, { useEffect, useState } from "react";
import NavigationBar from "./NavigationBar";
import { Button, Form, Card, Modal } from "react-bootstrap"
import { Outlet, useParams } from "react-router-dom";
import { getHubFromName } from '../../db/HubDB'
import { addTransaction } from "../../db/TransactionsDB";
import { useAuth } from "../../contexts/AuthContext";


const Booking = () => {
  const [show, setShow] = useState(false);
  const selectedHubName = localStorage['selectedHubName']
  localStorage.removeItem('selectedHubName')
  const { currentUser } = useAuth()
  const [selectValue, setSelectValue] = useState(null)
  const [currCap, setCurrCap] = useState(null)
  const [currToCred,setCurrToCred] = useState(null)
  const [amt, setAmt] = useState('')
  const [convRate, setConvRate] = useState(null)
  const [docId,setDocId] = useState(null)

  useEffect(() => {
    
    if (selectedHubName) {
      getHubFromName(selectedHubName).then((res) => {
        setCurrToCred(res[0]._delegate._document.data.value.mapValue.fields.currencyToCredits.integerValue)
        setCurrCap(res[0]._delegate._document.data.value.mapValue.fields.hubCurrentCapacity.integerValue)
        setConvRate(res[0]._delegate._document.data.value.mapValue.fields.wattsToCredits.doubleValue)
        setDocId(res[0].id)
      });
    } else {
      getHubFromName('Alpha').then((res) => {
        setCurrToCred(res[0]._delegate._document.data.value.mapValue.fields.currencyToCredits.integerValue)
        setCurrCap(res[0]._delegate._document.data.value.mapValue.fields.hubCurrentCapacity.integerValue)
        setConvRate(res[0]._delegate._document.data.value.mapValue.fields.wattsToCredits.doubleValue)
        setDocId(res[0].id)
      });
    }
  }, [])

  useEffect(() => {
    if (selectValue != null) {
      getHubFromName(selectValue).then((res) => {
        setCurrToCred(res[0]._delegate._document.data.value.mapValue.fields.currencyToCredits.integerValue)
        setCurrCap(res[0]._delegate._document.data.value.mapValue.fields.hubCurrentCapacity.integerValue);
        setConvRate(res[0]._delegate._document.data.value.mapValue.fields.wattsToCredits.doubleValue);
        setDocId(res[0].id)
      });
    }
    else {
      setSelectValue(selectedHubName)
    }
  }, [selectValue]);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (e) => {
    e.preventDefault();
    if(amt!=''){
      setShow(true);
    }
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      cost: amt * convRate, 
      creditsEarned: -1*currToCred*amt*convRate,
      dateCompleted: "",
      energyAmount: parseInt(amt),
      hubId: parseInt(docId), 
      status: "Pending",
      transactionType: 0,
      userName: currentUser.email
    }
    addTransaction(data);
    setShow(false);
  }

  const handleSelect = (val) => {
    setSelectValue(val)
  }
  const handleChange = (value) => {
    try {
      if (parseInt(value) > parseInt(currCap) || parseInt(value) <= 0) {
        throw new Error('Invalid input')
      }
      else {
        setAmt(value)
      }
    }
    catch (e) {
      console.log('Invalid input, input out of available capacity range')
    }

  }
  return (
    <>
      <NavigationBar />
      {selectedHubName ?
        //form with preselected hub
        <Card className='p-3 m-3s'>
          <Form>
            <Form.Group className="mb-3" controlId="hubSelect">
              <Form.Label>Hub Name</Form.Label>
              <Form.Control
                as="select"
                defaultValue={selectedHubName}
                onChange={(e) => { handleSelect(e.target.value) }}>
                <option value={'Alpha'}>Alpha</option>
                <option value={'Bravo'}>Bravo</option>
                <option value={'Charlie'}>Charlie</option>
                <option value={'Delta'}>Delta</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="amtToBuy">
              <Form.Label>Amount to Buy(W) (Available Capacity: {currCap})</Form.Label>
              <Form.Control
                required
                type="number"
                value={amt}
                onChange={(e) => { handleChange(e.target.value) }}
                placeholder="Amount to Buy in Watts" />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={(e)=>handleShow(e)}>
              Submit
            </Button>
          </Form>

        </Card>
        :
        //fresh form
        <Card className='p-3 m-3s'>
          <Form>
            <Form.Group className="mb-3" controlId="hubSelect">
              <Form.Label>Hub Name</Form.Label>
              <Form.Control
                as="select"
                defaultValue={'Alpha'}
                onChange={(e) => { handleSelect(e.target.value) }}
              >
                <option value={'Alpha'}>Alpha</option>
                <option value={'Bravo'}>Bravo</option>
                <option value={'Charlie'}>Charlie</option>
                <option value={'Delta'}>Delta</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="amtToBuy">
              <Form.Label>Amount to Buy(W) (Available Capacity: {currCap})</Form.Label>
              <Form.Control
                required
                type="number"
                value={amt}
                onChange={(e) => { handleChange(e.target.value) }}
                placeholder="Amount to Buy in Watts" />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={(e)=>handleShow(e)}>
              Submit
            </Button>
          </Form></Card>


      }
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Hub Name: {selectValue}
          <p></p>
          Amount: {amt}
          <p></p>
          Credits Required: {amt * convRate}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" size="sm" onClick={handleClose}>
            No
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={(e) => handleSubmit(e)}
          >
            yes
          </Button>
        </Modal.Footer>
      </Modal>
      <Outlet></Outlet>

    </>
  );
};

export default Booking;
