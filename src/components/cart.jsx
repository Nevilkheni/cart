import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cartItems")) || []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const removeFromCart = (productid) => {
    setCartItems(cartItems.filter((item) => item.productid !== productid));
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  
    const total = cartItems.reduce((total, item) => total + item.price * item.qty, 0);
    localStorage.setItem("cartTotal", total.toFixed(2)); 
  }, [cartItems]);
  

  const updateQuantity = (productid, amount) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productid === productid
          ? { ...item, qty: Math.max(1, item.qty + amount) } 
          : item
      )
    );
  };


  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.qty, 0);

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.productid}>
                  <td>
                    <img src={item.image} alt={item.productname} width="50" />
                  </td>
                  <td>{item.productname}</td>
                  <td>₹{item.price.toLocaleString()}</td>
                  <td>
                    <button className="qty-btn" onClick={() => updateQuantity(item.productid, -1)}>-</button>
                    <span className="qty">{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(item.productid, 1)}>+</button>
                  </td>
                  <td>₹{(item.price * item.qty).toLocaleString()}</td>
                  <td>
                    <button className="remove-btn" onClick={() => removeFromCart(item.productid)}>❌ Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="total">
            <h2>Total: ₹{totalAmount.toLocaleString()}</h2>
          </div>

          <button className="back" onClick={() => navigate("/shop")}>← Back to Shop</button>

          {cartItems.length > 0 && (
            <button className="pay-now" onClick={() => navigate("/payment")}>💳 Proceed to Payment</button>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
