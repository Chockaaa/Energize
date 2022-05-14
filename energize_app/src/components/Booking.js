import React, { useEffect, useState } from "react";
import NavigationBar from "./NavigationBar";
import { Button, Form,Card } from "react-bootstrap"
import { Outlet, useParams } from "react-router-dom";
import { getHubs, getHubFromName } from '../db/HubDB'

const Booking = () => {
  //const hubSelected = useParams()
  const selectedHubName = localStorage['selectedHubName']
  localStorage.removeItem( 'selectedHubName' )

  const [selectValue, setSelectValue] = useState('Alpha')
  const [currCap, setCurrCap] = useState('')
  const [amt,setAmt]=useState('')
  
  
  useEffect(() => {
    if(selectedHubName){
      getHubFromName(selectedHubName).then((res) => {
        setCurrCap(res[0]._delegate._document.data.value.mapValue.fields.hubCurrentCapacity.integerValue);
      });
    }else{
      getHubFromName('Alpha').then((res) => {
        setCurrCap(res[0]._delegate._document.data.value.mapValue.fields.hubCurrentCapacity.integerValue);
      });
    }
  },[])
  
  useEffect(() => {
    if (selectValue != null) {
      getHubFromName(selectValue).then((res) => {
        setCurrCap(res[0]._delegate._document.data.value.mapValue.fields.hubCurrentCapacity.integerValue);
      });
    }
    else {
      setSelectValue(selectedHubName)
    }
  }, [selectValue]);
  

  const handleSubmit =()=>{
    // submit hubId,how much to buy,current time
    let ts = Date.now();
    //selectValue
    //amt
    console.log(selectValue,amt,ts);
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

          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form></Card> :
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
