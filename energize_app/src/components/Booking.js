import React, { useEffect, useState } from "react";
import NavigationBar from "./NavigationBar";
import { Button, Form,Card } from "react-bootstrap"
import { Outlet, useParams } from "react-router-dom";
import { getHubs, getHubFromID } from '../db/HubDB'

const Booking = () => {
  const hubSelected = useParams()
  const [selectValue, setSelectValue] = useState(null)
  const [currCap, setCurrCap] = useState('')
  const [amt,setAmt]=useState('')
  
  useEffect(() => {
    if(Object.keys(hubSelected).length==0){
      getHubFromID('1001').then((res) => {
        var hubDetails = res._delegate._document.data.value.mapValue.fields
        setCurrCap(hubDetails.hubCurrentCapacity.integerValue);
      });
    }
  },[])

  useEffect(() => {
    if (selectValue != null) {
      getHubFromID(selectValue).then((res) => {
        var hubDetails = res._delegate._document.data.value.mapValue.fields
        setCurrCap(hubDetails.hubCurrentCapacity.integerValue);
      });
    }
    else {
      setSelectValue(hubSelected.hubId)
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
    setSelectValue(val.toString())
  }
  const handleChange=(value)=>{
    try{
      if(parseInt(value)>parseInt(currCap)||parseInt(value)<0){
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
      {Object.keys(hubSelected).length!=0 ?
        //form with preselected hub
        <Card className='p-3 m-3s'>
        <Form>
          <Form.Group className="mb-3" controlId="hubSelect">
            <Form.Label>Hub ID</Form.Label>
            <Form.Control
              as="select"
              defaultValue={hubSelected.hubId}
              onChange={(e) => { handleSelect(e.target.value) }}
            >
              <option value={1001}>1001</option>
              <option value={1002}>1002</option>
              <option value={1003}>1003</option>
              <option value={1004}>1004</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="amtToBuy">
            <Form.Label>Amount to Buy(W) / {currCap}</Form.Label>
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
            <Form.Label>Hub ID</Form.Label>
            <Form.Control
              as="select"
              defaultValue={1001}
              
              onChange={(e) => { handleSelect(e.target.value) }}
            >
              <option value={1001}>1001</option>
              <option value={1002}>1002</option>
              <option value={1003}>1003</option>
              <option value={1004}>1004</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="amtToBuy">
            <Form.Label>Amount to Buy(W) / {currCap}</Form.Label>
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
