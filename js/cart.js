
const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
let totalAmount = parseFloat(localStorage.getItem("cartTotal")) || 0;

const cartItemsContainer = document.getElementById('cart-items');
const cartTotalContainer = document.getElementById('cart-total');


function renderCartItems() {
    cartItemsContainer.innerHTML = '';

    cartItems.forEach(item => {
        const itemRow = document.createElement('tr');


        const imageCell = document.createElement('td');
        const productImage = document.createElement('img');
        productImage.src = item.image;
        imageCell.appendChild(productImage);
        itemRow.appendChild(imageCell);

        const nameCell = document.createElement('td');
        nameCell.innerText = item.productname;
        itemRow.appendChild(nameCell);


        const priceCell = document.createElement('td');
        priceCell.innerText = item.price.toLocaleString();
        itemRow.appendChild(priceCell);


        const qtyCell = document.createElement('td');
        const qtyInput = document.createElement('input');       
        qtyInput.type = "number";
        qtyInput.value = item.qty;
        qtyInput.style.width = '50px';


        const totalCell = document.createElement('td');
        totalCell.innerText = (item.price * item.qty).toLocaleString();
        itemRow.appendChild(totalCell);

        qtyInput.addEventListener('change', () => {
            editItem(item.productid, qtyInput.value);

            totalCell.innerText = (item.price * qtyInput.value).toLocaleString();
            updateTotal();
        });

        qtyCell.appendChild(qtyInput);
        itemRow.appendChild(qtyCell);

        const actionCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.classList.add('delete-btn');
        deleteButton.onclick = () => removeItem(item.productid);

        actionCell.appendChild(deleteButton);
        itemRow.appendChild(actionCell);

        cartItemsContainer.appendChild(itemRow);
    });
}


function removeItem(productId) {
    const updatedCartItems = cartItems.filter(item => item.productid !== productId);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    window.location.reload();
}

function editItem(productId, newQty) {
    const updatedCartItems = cartItems.map(item => {
        if (item.productid === productId) {
            item.qty = parseInt(newQty);
        }
        return item;
    });
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
}

function updateTotal() {
    totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    localStorage.setItem('cartTotal', totalAmount);
    cartTotalContainer.innerHTML = `Total: ${totalAmount.toLocaleString()}`;
}



renderCartItems();
updateTotal();

function proceedToPayment() {
   
    if (typeof totalAmount !== 'undefined' && totalAmount > 0) {
       
        localStorage.setItem('paymentAmount', totalAmount);
        
       
        window.location.href = "./payment.html";
    } else {
        alert('Total amount is not available.');
    }
}
function updateTotal() {
    const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    localStorage.setItem('cartTotal', totalAmount); 
    cartTotalContainer.innerHTML = `Total: ${totalAmount.toLocaleString()}`;
}



