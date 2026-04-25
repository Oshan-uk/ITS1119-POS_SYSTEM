

const VALID_USERNAME = "oshan";
const VALID_PASSWORD = "1234";


// Login
function login() {

    const username = document.getElementById("username-input").value.trim();
    const password = document.getElementById("password-input").value.trim();
    const messageBox = document.getElementById("message-box");

    messageBox.innerHTML = "";

    if (username === "" && password === "") {
        showLoginError("Please enter your username and password");
        return;
    }

    if (username === "") {
        showLoginError("Please enter your username");
        document.getElementById("username-input").classList.add("is-invalid");
        return;
    }

    if (password === "") {
        showLoginError("Please enter your password");
        document.getElementById("password-input").classList.add("is-invalid");
        return;
    }

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {

        document.getElementById("username-input").value = "";
        document.getElementById("password-input").value = "";
        document.getElementById("username-input").classList.remove("is-invalid");
        document.getElementById("password-input").classList.remove("is-invalid");

        document.getElementById("loginView").style.display      = "none";
        document.getElementById("dashboardView").style.display  = "block";

        showPage("dashboard");

    } else {
        showLoginError("Invalid username or password");
        document.getElementById("username-input").classList.add("is-invalid");
        document.getElementById("password-input").classList.add("is-invalid");
    }
}



// Logout
function logout() {

    const confirmed = confirm("⚠ Are you sure you want to logout? ⚠");
    if (!confirmed) return;

    document.getElementById("dashboardView").style.display = "none";
    document.getElementById("loginView").style.display     = "block";

    document.getElementById("username-input").value = "";
    document.getElementById("password-input").value = "";
    document.getElementById("message-box").innerHTML = "";
    document.getElementById("username-input").classList.remove("is-invalid");
    document.getElementById("password-input").classList.remove("is-invalid");
}


// Page Show
function showPage(page) {

    const allPages = document.querySelectorAll(".page-section");
    allPages.forEach(p => p.style.display = "none");

    document.getElementById("page-" + page).style.display = "block";

    const allBtns = document.querySelectorAll(".nav-btn");
    allBtns.forEach(btn => btn.classList.remove("active"));

    allBtns.forEach(btn => {
        if (btn.getAttribute("onclick") === `showPage('${page}')`) {
            btn.classList.add("active");
        }
    });
}

// Error Show
function showLoginError(message) {
    const messageBox = document.getElementById("message-box");
    messageBox.innerHTML = `<span style="color:#f87171; font-size:13px;">⚠ ${message} ⚠</span>`;
}


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("password-input").addEventListener("keydown", function (e) {
        if (e.key === "Enter") login();
    });
    document.getElementById("username-input").addEventListener("keydown", function (e) {
        if (e.key === "Enter") login();
    });

    document.getElementById("username-input").addEventListener("input", function () {
        this.classList.remove("is-invalid");
        document.getElementById("message-box").innerHTML = "";
    });
    document.getElementById("password-input").addEventListener("input", function () {
        this.classList.remove("is-invalid");
        document.getElementById("message-box").innerHTML = "";
    });
});