import React, { useEffect, useState } from "react";
import NavigationBar from "./NavigationBar";
import { Button,Form,Card,Modal} from "react-bootstrap"
import { Outlet, useParams } from "react-router-dom";
import { getHubFromName } from '../../db/HubsDB'
import { addTransaction } from "../../db/TransactionsDB";
import { useAuth } from "../../contexts/AuthContext";

const Booking = () => {
  const [show, setShow] = useState(false);
  const selectedHubName = localStorage['selectedHubName']
  localStorage.removeItem( 'selectedHubName' )
  const { currentUser } = useAuth()
  const [selectValue, setSelectValue] = useState('Alpha')
  const [currCap, setCurrCap] = useState(null)
  const [amt,setAmt]=useState('')
  const [convRate,setConvRate] = useState(null)
  
  useEffect(() => {
    if(selectedHubName){
      getHubFromName(selectedHubName).then((res) => {
        console.log(res)
        setCurrCap(res[0]._delegate._document.data.value.mapValue.fields.hubCurrentCapacity.integerValue);
        //setConvRate(res[0]._delegate._document.data.value.mapValue.fields.wattsToCredits.doubleValue);
      });
    }else{
      getHubFromName('Alpha').then((res) => {
        console.log(res)
        setCurrCap(res[0]._delegate._document.data.value.mapValue.fields.hubCurrentCapacity.integerValue);
        //setConvRate(res[0]._delegate._document.data.value.mapValue.fields.wattsToCredits.doubleValue);
      });
    }
  },[])
  
  useEffect(() => {
    if (selectValue != null) {
      getHubFromName(selectValue).then((res) => {
        setCurrCap(res[0]._delegate._document.data.value.mapValue.fields.hubCurrentCapacity.doubleValue);
        setConvRate(res[0]._delegate._document.data.value.mapValue.fields.wattsToCredits.doubleValue);
      });
    }
    else {
      setSelectValue(selectedHubName)
    }
  }, [selectValue]);
  
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (id) => {
    setShow(true);
  };
  function handleCancel(id) {
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      cost: amt * convRate, //conversion
      creditsEarned: 0,
      dateCompleted: "",
      energyAmount: amt,
      hubId: selectValue, //hub id
      status: "Pending",
      transactionType: 0,
      userName: currentUser.email
    }
    addTransaction(data);
  }

  const handleSelect = (val) => {
    setSelectValue(val)
  }
  const handleChange=(value)=>{
    try{
      if(parseInt(value)>parseInt(currCap)||parseInt(value)<=0){
        throw new Error('Invalid input')
      }
      else{
        setAmt(value)
      }
    }
    catch(e) {
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
              onChange={(e)=>{handleChange(e.target.value)}}
              placeholder="Amount to Buy in Watts" />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleShow()}>
            Submit
          </Button>
        </Form>
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Transactions</Modal.Title>
            </Modal.Header>

            <Modal.Body>

            </Modal.Body>
            <Modal.Footer>
          <Button variant="danger" size="sm" onClick={handleClose}>
            No
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleCancel()}
          >
            Yes
          </Button>
        </Modal.Footer>
        </Modal>
        </Card> :
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
              onChange={(e)=>{handleChange(e.target.value)}}
              placeholder="Amount to Buy in Watts" />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form></Card>
        
      }
      <Outlet></Outlet>
      
    </>
  );
};

export default Booking;
