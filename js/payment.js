

        

document.addEventListener('DOMContentLoaded', function() {
    const amountInput = document.getElementById('amount'); 
    const totalAmount = localStorage.getItem('cartTotal'); 
    if (totalAmount) {
        amountInput.value = parseFloat(totalAmount).toFixed(2); 
    }
});



        function openTab(evt, tabName) {
            var i, tabcontent, tablinks;
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            }
            document.getElementById(tabName).style.display = "block";
            evt.currentTarget.className += " active";
        }
        document.getElementById('card-form').addEventListener('submit', function(event) {
            event.preventDefault();
        
            const cardholderName = document.getElementById('cardholder-name').value;
            const cardNumber = document.getElementById('card-number').value;
            const randomId = Math.floor(Math.random() * 1000000); 
            const expDate = document.getElementById('exp-date').value;
        
            localStorage.setItem('cardholderName', cardholderName);
            localStorage.setItem('transactionId', randomId);
            localStorage.setItem('expDate', expDate); 
        
            window.location.href = './invoice.html'; 
        });
        

