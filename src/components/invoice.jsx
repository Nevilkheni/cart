import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/invoice.css";

const Invoice = () => {
  const navigate = useNavigate();
  const [invoiceData, setInvoiceData] = useState({
    cardholderName: "",
    transactionId: "",
    totalAmount: "0.00",
    expDate: "",
  });

  useEffect(() => {
    setInvoiceData({
      cardholderName: localStorage.getItem("cardholderName") || "N/A",
      transactionId: localStorage.getItem("transactionId") || "N/A",
      totalAmount: localStorage.getItem("cartTotal") || "0.00",
      expDate: localStorage.getItem("expDate") || "N/A",
    });
  }, []);

  return (
    <div className="invoice-container">
      <h1>Invoice</h1>
      <p><strong>Cardholder Name:</strong> {invoiceData.cardholderName}</p>
      <p><strong>Transaction ID:</strong> {invoiceData.transactionId}</p>
      <p><strong>Total Amount Paid:</strong> ₹{parseFloat(invoiceData.totalAmount).toFixed(2)}</p>
      <p><strong>Date:</strong> {invoiceData.expDate}</p>

      <button className="back-btn" onClick={() => navigate("/shop")}>🛒 Back to Shop</button>
    </div>
  );
};

export default Invoice;
