let data = [
    {
        productid: 111,
        productname: "German car Audi Q8",
        qty: 1,
        price: 20000000,
        description: "Nice car she loves it",
        image: "image/audi.webp"
    },
    {
        productid: 222,
        productname: "German car BMW X5",
        qty: 1,
        price: 15000000,
        description: "Nice car he loves it",
        image: "image/bmw.webp"
    },
    {
        productid: 333,
        productname: "German car Marc GLS 600D",
        qty: 1,
        price: 30000000,
        description: "Nice car he loves it",
        image: "image/marc.webp"
    },
    {
        productid: 444,
        productname: "Japanese Mini Cooper",
        qty: 1,
        price: 5000000,
        description: "Nice car she loves it",
        image: "image/mini.webp"
    },
    {
        productid: 555,
        productname: "American car Porsche 911",
        qty: 1,
        price: 10000000,
        description: "Nice car he loves it",
        image: "image/porsh.webp"
    },
    {
        productid: 666,
        productname: "Indian car Volvo XC90",
        qty: 1,
        price: 9000000,
        description: "Nice car he loves it",
        image: "image/volvo.webp"
    },
    {
        productid: 777,
        productname: "zapanis car fortuner",
        qty: 1,
        price: 5500000,
        description: "Nice car he loves it",
        image: "image/fortuner.jpeg"
    },
    {
        productid: 888,
        productname: "Indian car endover",
        qty: 1,
        price: 6000000,
        description: "Nice car he loves it",
        image: "image/endover.webp"
    },
    {
        productid: 999,
        productname: "Indian car defender",
        qty: 1,
        price: 12000000,
        description: "Nice car he loves it",
        image: "image/defender.webp"
    },

    {
        productid: 101010,
        productname: "german car phantom",
        qty: 1,
        price: 80000000,
        description: "Nice car he loves it",
        image: "image/phantom.webp"
    },
    {
        productid: 111111,
        productname: "german car bentley",
        qty: 1,
        price: 70000000,
        description: "Nice car he loves it",
        image: "image/Bentley.webp"
    },
    {
        productid: 121212,
        productname: "Indian car range",
        qty: 1,
        price: 12000000,
        description: "Nice car he loves it",
        image: "image/RangeRover.jpeg"
    },

    {
        productid: 131313,
        productname: "Indian car aston-martin",
        qty: 1,
        price: 20000000,
        description: "Nice car he loves it",
        image: "image/aston-martin.jpeg"
    },
    {
        productid: 141414,
        productname: "Indian car jaguar",
        qty: 1,
        price: 12000000,
        description: "Nice car he loves it",
        image: "image/jaguar.png"
    },
    {
        productid: 151515,
        productname: "american car tesla",
        qty: 1,
        price: 12000000,
        description: "Nice car he loves it",
        image: "image/tesla.jpeg"
    },
];



let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

function createUI() {
    const productGrid = document.getElementById('product-grid');
    data.forEach(item => {
        const productDiv = document.createElement('div');
        productDiv.className = "product";

        const productImage = document.createElement('img');
        productImage.src = item.image;
        productImage.style.width = '100%';
        productDiv.appendChild(productImage);

        const productName = document.createElement('h3');
        productName.innerText = item.productname;
        productDiv.appendChild(productName);

        const productPrice = document.createElement('p');
        productPrice.innerText = `Price: ${item.price}`;
        productDiv.appendChild(productPrice);

        const addToCartBtn = document.createElement('button');
        addToCartBtn.innerText = "Add to Cart";
        addToCartBtn.addEventListener('click', () => addToCart(item));
        productDiv.appendChild(addToCartBtn);

        productGrid.appendChild(productDiv);
    });
}

function addToCart(item) {
    if (isUserLoggedIn()) {

        const existingItem = cartItems.find(cartItem => cartItem.productid === item.productid);
        if (existingItem) {
            existingItem.qty += 1;
        } else {
            cartItems.push(item);
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        updateCartCount();
        alert(`${item.productname} added to cart`);
    } else {
        alert("Please log in to add items to your cart.");
    }
}

function openCartPage() {
    if (isUserLoggedIn()) {

        const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
        localStorage.setItem("cartTotal", total);


        window.location.href = "./cart.html";
    } else {
        alert("Please log in to view your cart.");
        window.location.href = "./login/login.html";
    }
}


function handleAuth() {
    if (isUserLoggedIn()) {

        // Log out logic
        localStorage.removeItem("loggedIn");
        cartItems = [];
        localStorage.removeItem('cartItems');
        document.getElementById('auth-btn').innerText = "Log in";
        disableCart();
        alert("You have logged out.");

    } else {


        localStorage.setItem("loggedIn", "true");
        document.getElementById('auth-btn').innerText = "Log out";
        enableCart();
        alert("You have logged in.");


        window.location.href = "./login/login.html";
    }
}


function isUserLoggedIn() {
    return localStorage.getItem("loggedIn") === "true";
}

function disableCart() {
    document.getElementById('cart-button').disabled = true;
}

function enableCart() {
    document.getElementById('cart-button').disabled = false;
}

function updateCartCount() {
    const cartButton = document.getElementById('cart-button');
    cartButton.innerText = `Cart (${cartItems.length})`;
}

window.onload = function () {
    if (isUserLoggedIn()) {
        enableCart();
        document.getElementById('auth-btn').innerText = "Log out";
    } else {
        disableCart();
        document.getElementById('auth-btn').innerText = "Log in";
    }

    updateCartCount();
};

document.getElementById('cart-button').addEventListener('click', () => openCartPage());
document.getElementById('auth-btn').addEventListener('click', () => handleAuth());
createUI();
