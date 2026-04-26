
const USERNAME = "admin";
const PASSWORD = "1234";


$("#login-btn").on("click", () => {

    const username = $("#username-input").val().trim();
    const password = $("#password-input").val().trim();

    if (!username || !password) {
        $("#message-box").html(
            `<div class="alert alert-warning">Enter username and password</div>`
        );
        return;
    }

    if (username === USERNAME && password === PASSWORD) {

        $("#message-box").html("");


        alert("Login Success!");


    } else {
        $("#message-box").html(
            `<div class="alert alert-danger">Invalid credentials</div>`
        );
    }
});