import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import products from "../data/product";
import "../css/product.css";

const Shop = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("loggedIn") === "true");
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cartItems")) || []);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("loggedIn") === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    if (!isLoggedIn) {
      alert("Please log in to add items to your cart.");
      navigate("/login");
      return;
    }

    setCartItems((prevCart) => {
      const existingItem = prevCart.find(cartItem => cartItem.productid === item.productid);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.productid === item.productid
            ? { ...cartItem, qty: cartItem.qty + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, qty: 1 }];
      }
    });

    alert(`${item.productname} added to cart`);
  };

  const totalCartItems = cartItems.reduce((total, item) => total + item.qty, 0);

  return (
    <>
      <header className="header">
        <h1>Car Shop</h1>
        <div>
          <button className="cart-button" onClick={() => navigate("/cart")}>
            🛒 Cart ({totalCartItems})
          </button>
          <button
            className="cart-button"
            onClick={() => {
              if (isLoggedIn) {
                localStorage.removeItem("loggedIn");
                localStorage.removeItem("cartItems");
                setIsLoggedIn(false);
                setCartItems([]);
                alert("You have logged out.");
              } else {
                navigate("/login");
              }
            }}
          >
            {isLoggedIn ? "Log out" : "Log in"}
          </button>
        </div>
      </header>

      <div className="product-grid">
        {products.map((item) => (
          <div key={item.productid} className="product">
            <img src={item.image} alt={item.productname} />
            <h3>{item.productname}</h3>
            <p>{item.description}</p>
            <p>Price: ₹{item.price.toLocaleString()}</p>
            <button onClick={() => addToCart(item)}>➕ Add to Cart</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Shop;
