import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/payment.css";
import { cardLogos } from "./logos";

const Payment = () => {
  const navigate = useNavigate();
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  const savedCards = [
    { id: 1, name: "John", number: "**** **** **** 1234", exp: "12/25", cvv: "123", logo: cardLogos.visa },
    { id: 2, name: "Jane", number: "**** **** **** 5678", exp: "06/24", cvv: "456", logo: cardLogos.card },
  ];

  const generateTransactionId = () => "TXN" + Math.floor(Math.random() * 1000000000);

  const handlePayment = (e) => {
    e.preventDefault();
    const transactionId = generateTransactionId();
    const cartTotal = localStorage.getItem("cartTotal") || "0.00";

    localStorage.setItem("cardholderName", cardholderName || selectedCard?.name);
    localStorage.setItem("transactionId", transactionId);
    localStorage.setItem("expDate", expDate || selectedCard?.exp);
    localStorage.setItem("cartTotal", cartTotal);

    navigate("/invoice");
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2>Payment</h2>

        <h3>Saved Cards</h3>
        {savedCards.map((card) => (
          <div
            key={card.id}
            className={`saved-card ${selectedCard?.id === card.id ? "selected" : ""}`}
            onClick={() => setSelectedCard(card)}
          >
            <img src={card.logo} alt="Card Logo" />
            <div>
              <p><strong>{card.name}</strong></p>
              <p>{card.number} | Exp: {card.exp}</p>
            </div>
          </div>
        ))}

        <h3>Or Enter New Card</h3>
        <form onSubmit={handlePayment}>
          <div className="form-group">
            <label>Cardholder Name</label>
            <input
              type="text"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              placeholder="John Doe"
              disabled={!!selectedCard}
            />
          </div>

          <div className="form-group">
            <label>Card Number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) =>
                setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))
              }
              placeholder="0000 0000 0000 0000"
              disabled={!!selectedCard}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Exp. Date</label>
              <input
                type="text"
                value={expDate}
                onChange={(e) =>
                  setExpDate(e.target.value.replace(/[^0-9/]/g, "").slice(0, 5))
                }
                placeholder="MM/YY"
                disabled={!!selectedCard}
              />
            </div>

            <div className="form-group">
              <label>CVV</label>
              <input
                type="text"
                value={cvv}
                onChange={(e) =>
                  setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))
                }
                placeholder="123"
                disabled={!!selectedCard}
              />
            </div>
          </div>

          <button type="submit" className="pay-btn">💳 Generate Invoice</button>
        </form>

        <button className="back-btn" onClick={() => navigate("/cart")}>← Back to Cart</button>
      </div>
    </div>
  );
};

export default Payment;
