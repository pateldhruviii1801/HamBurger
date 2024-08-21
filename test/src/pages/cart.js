import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {
    const [quantity, setQuantity] = useState(1);

    const incrementQuantity = (order_id, quantity) => {
        Axios.post("http://localhost:1337/api/cartplus", { order_id: order_id, quantity: quantity })
            .then((response) => {
                window.location.reload();
            });
    };

    const decrementQuantity = (order_id, quantity) => {
        var newquantity = parseInt(quantity) - 1;
        if (parseInt(newquantity) === 0) {
            alert("this is not valid input");
        } else {
            Axios.post('http://localhost:1337/api/cartminus', { order_id: order_id, quantity: quantity })
                .then((response) => {
                    window.location.reload();
                });
        }
    };

    const [list, setList] = useState([]);

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("mydata"));

        if(localStorage.getItem("mydata")==null)
        {
            alert("please first login");
            window.location='/login';
        }
        else{
            Axios.get('http://localhost:1337/api/getCart', { params: { uuid: user.uid } })
            .then((response) => {
                setList(response.data);
            });
        }
    }, []);

    const countTotal = () => {
        let total = 0;
        list.map((val) => (total = total + val.quantity));
        return total;
    };

    const calculateTotal = () => {
        let total = 0;
        list.map((val) => (total = total + val.quantity * val.b_price));
        return total;
    };

    const remove = (order_id) => {
        Axios.post('http://localhost:1337/api/cartremove', { order_id: order_id })
            .then((response) => {
                window.location.reload();
            });
    };

    function submit_data() {
        window.location='/payment';
    }

    const navigate = useNavigate();

    const Payment = () => {
        navigate('/payment',{ state: {totalPrice: calculateTotal() }});
    };

    return (
        <>
            <div className="cart-container">
                <h2>Your Cart</h2>
                <div className="cart-items">
            {list.map((val) => {
                        return (
                            <div className="cart-item" key={val.order_id}>
                                <img src="/assests/images/blog1.jpg" alt="Burger Image" />
                                <div className="item-details">
                                    <h3>{val.b_name}</h3>
                                    <p>Rs.{val.b_price}</p>
                                    <div className="quantity-control">
                                        <button className="quantity-decrease" onClick={() => decrementQuantity(val.order_id, val.quantity)}>-</button>
                                        <span className="quantity">{val.quantity}</span>
                                        <button className="quantity-increase" onClick={() => incrementQuantity(val.order_id, val.quantity)}>+</button>
                                        <span className="quantity">Rs.{val.quantity * val.b_price}</span>
                                    </div>
                                </div>
                                <button className="remove-item" onClick={() => remove(val.order_id)}>Remove</button>
                            </div>
                        )
            })}
                </div>
                <div className="cart-summary">
                    <p>Total Items: <span className="total-items">{countTotal()}</span></p>
                    <p>Total Price: <span className="total-price">Rs.{calculateTotal()}</span></p>
                    <a href="/payment"><button className="checkout-button" onClick={Payment}>Place Order</button></a>
                    <a href="/category"><p className="additional-options">Want to order anything more?</p></a>
                </div>
            </div>
        </>
    );
}

export default Cart;