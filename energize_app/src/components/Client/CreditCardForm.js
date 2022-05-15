import React, { useState } from "react";
import { PaymentInputsWrapper, usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";
import { addCreditCardInfo } from "../../db/UsersDB";
import { useAuth } from "../../contexts/AuthContext";

const CreditCardForm = ({ setShowCreditCardForm }) => {
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvc, setCVC] = useState("");
  const [name, setName] = useState("")
  const { currentUser } = useAuth()

  const {
    wrapperProps,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
  } = usePaymentInputs();

  function handleSubmit(e) {
    e.preventDefault();
    let data = {
      cardNumber,
      expiryDate,
      cvc,
      name
    }
    addCreditCardInfo(currentUser.email, data).then(_ => {
      setShowCreditCardForm(false)
      window.location.reload(false)
    })
  } 

  return (
    <form onSubmit={handleSubmit} style={{ transform: 'scale(80%)', marginLeft: '-90px' }}>
        <PaymentInputsWrapper {...wrapperProps}>
        <svg {...getCardImageProps({ images })} />
        <input {...getCardNumberProps({ onChange: (e) => setCardNumber(e.target.value) })} value={cardNumber} />
        <input {...getExpiryDateProps({ onChange: (e) => setExpiryDate(e.target.value) })} value={expiryDate} />
        <input {...getCVCProps({ onChange: (e) => setCVC(parseInt(e.target.value)) })} value={cvc} />
        <input placeholder="Name on card" onChange={(e) => setName(e.target.value)} value={name} />
        <input type="submit" value="Add account" className="bg-transparent" />
      </PaymentInputsWrapper>
    </form>
  );
};

export default CreditCardForm;
