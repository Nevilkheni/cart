document.addEventListener('DOMContentLoaded', function() {
    const cardholderName = localStorage.getItem('cardholderName');
    const transactionId = localStorage.getItem('transactionId');
    const expDate = localStorage.getItem('expDate');
    const totalAmount = localStorage.getItem('cartTotal');

    document.getElementById('cardholder-name').innerText = cardholderName;
    document.getElementById('transaction-id').innerText = transactionId;
    document.getElementById('exp-date').innerText = expDate;
    document.getElementById('total-amount').innerText = parseFloat(totalAmount).toFixed(2);
});
