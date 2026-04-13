// LOGIN FUNCTION
function login() {

    let username = document.getElementById("username-input").value;
    let password = document.getElementById("password-input").value;

    if (username === "admin" && password === "1234") {

        // hide login page
        document.getElementById("login-page").style.display = "none";

        // show dashboard page
        document.getElementById("dashboard-page").style.display = "block";

    } else {
        document.getElementById("message-box").innerText =
            "Invalid username or password";
    }
}


// LOGOUT FUNCTION
function logout() {

    document.getElementById("dashboard-page").style.display = "none";
    document.getElementById("login-page").style.display = "block";

    // clear inputs
    document.getElementById("username-input").value = "";
    document.getElementById("password-input").value = "";
}