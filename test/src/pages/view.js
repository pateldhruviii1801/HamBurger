import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./view.css";

function View() {
    const [list, setList] = useState([]);

    useEffect(() => {
        let transaction_id = localStorage.getItem("selectedOrder");
        if (transaction_id) {
            Axios.get('http://localhost:1337/api/viewingOrders', {params: {transaction_id: transaction_id}
            })
                .then((response) => {
                    setList(response.data);
                })
                .catch((error) => {
                    console.error("Error", error);
                });
        }
    }, []);

    const calculateTotal = () => {
        let total = 0;
        list.map((item) => (total = total + item.quantity * item.b_price));
        return total;
    };

    const calculateTax = () => {
        const total = calculateTotal(); 
        const taxRate = 0.18;
        return total * taxRate;
    };
    
    const calculateTotalWithTax = () => {
        const total = calculateTotal(); // Calculate the total price
        const taxAmount = calculateTax(total); // Calculate the tax based on the total
        return total + taxAmount; // Return the total with tax included
    }

    function formatDateTime(timestamp) {
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleDateString(); // Format date
        return `${formattedDate}`;
    }

    const firstItem = list.find(() => true);// Find the first item (returns the first item if exists)
    // function goBack(){
    //     window.location = '/myorders';
    // }

    return (
        <>
        {/* <div className="main-banner-2"></div>
        <div className="cart-container">
            <h2>Order Details</h2>
            
            <table className="cart-table">
                <thead>
                    <tr>
                        <th>Sr.No</th>
                        <th>Burger Name(ID)</th>
                        <th>Quantity</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((item, index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{item.b_name}({item.burger_id})</td>
                            <td>{item.quantity}</td>
                            <td><button type="submit" onClick={goBack}>Back</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div> */}

{/* <header class="clearfix">
      <div id="logo">
        <img src="\assests\images\logo copy.png"/>
      </div>
      <div id="company">
        <h2 class="name">Company Name</h2>
        <div>455 Foggy Heights, AZ 85004, US</div>
        <div>(602) 519-0450</div>
        <div><a href="mailto:company@example.com">company@example.com</a></div>
      </div>
</header> */}

    <main>
      <div id="details" class="clearfix">
        <div id="client">
          <div class="to">INVOICE TO:</div>
          {list.length > 0 && (
                <>
                    <h2 className="name">{list[0].customer_name}</h2>
                    <div className="email">
                        <a href={`mailto:${list[0].customer_email}`}>{list[0].customer_email}</a>
                    </div>
                </>
          )}
          </div>
        <div id="invoice">
        {firstItem && (
          <>
            <h1>INVOICE {firstItem.transaction_id}</h1>
            <div className="date">Date of Invoice: {formatDateTime(firstItem.time)}</div>
          </>  
          )}
          {/* <div class="date">Due Date: 30/06/2014</div> */}
        </div>
      </div>
      <table border="0" cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <th class="no">Sr.No</th>
            <th class="desc">Burger Name(ID)</th>
            <th class="unit">Unit Price</th>
            <th class="qty">Quantity</th>
            <th class="total">Total</th>
          </tr>
        </thead>
        <tbody>
        {list.map((item, index) => (
            <tr key={index}>
                <td class="no">{index+1}</td>
                <td class="desc">{item.b_name}({item.burger_id})</td>
                <td class="unit">Rs.{item.b_price}</td>
                <td class="qty">{item.quantity}</td>
                <td class="total">Rs.{item.quantity * item.b_price}</td>
            </tr>
        ))}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2"></td>
            <td colspan="2">SUBTOTAL</td>
            <td>Rs.{calculateTotal()}</td>
          </tr>
          <tr>
            <td colspan="2"></td>
            <td colspan="2">TAX 18%</td>
            <td>Rs.{calculateTax()}</td>
          </tr>
          <tr>
            <td colspan="2"></td>
            <td colspan="2">GRAND TOTAL</td>
            <td>Rs.{calculateTotalWithTax()}</td>
          </tr>
        </tfoot>
      </table>
      <div id="thanks">Thank you!</div>
    </main> 
        </>
    );
}

export default View;