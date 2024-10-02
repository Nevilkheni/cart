const fixedEmail = "test@gmail.com";
const fixedPassword = "nnn";

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    if (email === fixedEmail && password === fixedPassword) {
        // Use a relative path to redirect if files are in the same directory or server
        window.location.href = "../index.html";

    } else {
        errorMessage.textContent = "Invalid email or password. Please try again.";
    }
});
