import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./order.css";

function Count() {
    const [order, setOrder] = useState([]);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        let burger_id = localStorage.getItem("selectedOrder");
            Axios.get('http://localhost:1337/api/countOrders',{params:{burger_id, from: fromDate, to: toDate}})
            .then((response) => {
                setOrder(response.data);
            })
        };
      

    const handleFilter = () => {
        fetchOrders();
    };

    return (
        <>
        <div className="main-banner-2"></div>

        <div className="cart-container">
            <h2>Most Orders</h2>
            
            <center>
     <div class="date-picker">
        
            <label for="start-date">From: </label>
            <input type="date" id="start-date" name="start-date" style={{marginLeft: "10px"}} value={fromDate} onChange={(e) => setFromDate(e.target.value)} required/>

            <label for="end-date" style={{marginLeft: "10px"}}>To: </label>
            <input type="date" id="end-date" name="end-date" style={{marginLeft: "10px"}}  value={toDate} onChange={(e) => setToDate(e.target.value)} required/>

            <button type="submit" style={{marginLeft: "10px", fontSize: "13px", backgroundColor: "#006fff" }} onClick={handleFilter}>GO</button>
        
        </div>
     </center>

            <table className="cart-table" style={{marginTop: "20px"}}>
                <thead>
                    <tr>
                        <th>Sr no</th>
                        <th>Burger Id</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {order.map((item, index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{item.burger_id}</td>
                            <td>{item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default Count;