import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login.jsx";
import Shop from "./components/shop.jsx";
import Cart from "./components/cart.jsx";
import Payment from "./components/payment.jsx";
import Invoice from "./components/invoice.jsx";


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Shop />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/invoice" element={<Invoice />} />

      </Routes>
    </Router>
  );
}

export default App;
