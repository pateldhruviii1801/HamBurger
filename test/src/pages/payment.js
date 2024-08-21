import React, { useState } from "react";
import Axios from "axios";
import { useLocation } from "react-router-dom";

function Payment() {

  const location = useLocation();
  const [Payment_mode,setPayment_mode] = useState();
  const price = location.state?.totalPrice || 0;

  // const handlePaymentChange = (userid) => {
  //   setPayment_mode(userid)
  // }

  function submit_data () {
    if (!Payment_mode) {
      alert("Please select a payment mode");
      return;
    }
    alert(Payment_mode);

    const user = JSON.parse(localStorage.getItem("mydata"));
    console.log(user.uid)
    Axios.post('http://localhost:1337/api/payment',
			{uuuid: user.uid, mode: Payment_mode }).then((response)=>{
				
        if(response.data.message)
          {
              alert(response.data.message);

              window.location="/payment"
      
          }
          else{
              console.log(response);
              alert('success');
              window.location="/"
          }
			});
  }

  return (
    <>
      <div className="main-banner-2"></div>

      <div className="breadcrumb-agile bg-light py-2">
        <ol className="breadcrumb bg-light m-0">
          <li className="breadcrumb-item">
            <a href="index.html">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Checkout Page
          </li>
        </ol>
      </div>

      <div className="payment-container">
        <h2>Choose Payment Mode :</h2>
        <p className="total-price">Total Price: Rs.{price}</p>
        <div className="radio-group">
          
          <input type="radio" id="upi" name="payment" value="UPI" onClick={(e) => setPayment_mode(e.target.value)} />
          <label htmlFor="upi">UPI</label>

          <input type="radio" id="debit-card" name="payment" value="Debit Card" onClick={(e) => setPayment_mode(e.target.value)} />
          <label htmlFor="debit-card">Debit Card or Credit Card</label>

          <input type="radio" id="netbanking" name="payment" value="Netbanking" onClick={(e) => setPayment_mode(e.target.value)} />
          <label htmlFor="netbanking">Netbanking</label>

          <input type="radio" id="cod" name="payment" value="COD" onClick={(e) => setPayment_mode(e.target.value)} />
          <label htmlFor="cod">Cash on Delivery</label>
        </div>
        <button type="submit" onClick={submit_data}>Place Your Order</button>
      </div>
    </>
  );
}

export default Payment;