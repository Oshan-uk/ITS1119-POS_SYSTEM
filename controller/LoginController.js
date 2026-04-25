
const VALID_USER = "admin";
const VALID_PASS = "1234";



function doLogin() {
    const username = document.getElementById("input-username").value.trim();
    const password = document.getElementById("input-password").value.trim();
    const errEl    = document.getElementById("login-error");

    errEl.textContent = "";

    if (!username || !password) {
        errEl.textContent = "Please enter both username and password.";
        return;
    }

    if (username === VALID_USER && password === VALID_PASS) {
        document.getElementById("login-page").style.display     = "none";
        document.getElementById("dashboard-page").style.display = "flex";
        updateDashboard();
    } else {
        errEl.textContent = "Invalid username or password.";
    }
}

function doLogout() {
    if (!confirm("Are you sure you want to logout?")) return;
    document.getElementById("dashboard-page").style.display = "none";
    document.getElementById("login-page").style.display     = "flex";
    document.getElementById("input-username").value = "";
    document.getElementById("input-password").value = "";
    document.getElementById("login-error").textContent = "";
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("input-password").addEventListener("keydown", function (e) {
        if (e.key === "Enter") doLogin();
    });
});