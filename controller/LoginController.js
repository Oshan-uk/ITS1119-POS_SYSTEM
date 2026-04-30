
const USERNAME = "admin";
const PASSWORD = "1234";


$("#login-btn").on("click", () => {

    const username = $("#username-input").val().trim();
    const password = $("#password-input").val().trim();

    if (!username || !password) {
        $("#message-box").text("⚠️ Enter username and password ⚠️");
        return;
    }

    if (username === USERNAME && password === PASSWORD) {

        $("#message-box").text("");

        $("#loginWrapper").hide();

        $("#mainPage").show();

        showPage("dashboard");

    } else {
        $("#message-box").text("⚠️ Invalid credentials ⚠️");
    }
});


$("#logout-btn").on("click", () => {

    $("#mainPage").hide();
    $("#loginWrapper").show();

    $("#username-input").val("");
    $("#password-input").val("");
});


function showPage(page) {

    $("#page-dashboard, #page-customers, #page-items, #page-neworder, #page-orderhistory").hide();

    $("#page-" + page).show();


    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');

        if (btn.textContent.toLowerCase().includes(page)) {
            btn.classList.add('active');
        }
    });
}

window.showPage = showPage;


