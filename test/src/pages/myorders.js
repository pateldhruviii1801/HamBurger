import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./order.css";

function Myorder() {
    const [order, setOrder] = useState([]);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        let user = JSON.parse(localStorage.getItem("mydata"));
        if (user) {
            Axios.get('http://localhost:1337/api/displayingOrders',{params:{userid: user.uid, from: fromDate, to: toDate}})
            .then((response) => {
                setOrder(response.data);
            })
            .catch((error) => {
                console.error("Error", error);
            });
        }
      }

    const handleFilter = () => {
        fetchOrders();
    };

    function submit_data(transaction_id){
        localStorage.setItem('selectedOrder', transaction_id);
        window.location = '/view';
    }

    function formatDateTime(timestamp) {
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleDateString(); // Format date
        const formattedTime = date.toLocaleTimeString(); // Format time
        return `${formattedDate} ${formattedTime}`;
    }

    return (
        <>
        <div className="main-banner-2"></div>

        <div className="cart-container">
            <h2>Your Orders</h2>
            
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
                        <th>User</th>
                        <th>Transaction ID</th>
                        <th>DATE & TIME</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {order.map((item, index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{item.user_id}</td>
                            <td>{item.transaction_id}</td>
                            <td>{formatDateTime(item.time)}</td>
                            <td><button type="submit" onClick={() => submit_data(item.transaction_id)}>VIEW</button></td>
                        </tr>
                    ))}
                </tbody>
                </table>
                
        </div>
        </>
    );
}

export default Myorder;