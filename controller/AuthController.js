

var VALID_USERNAME = "admin";
var VALID_PASSWORD = "1234";


function login() {

    var username = $("#txt-username").val().trim();
    var password = $("#txt-password").val().trim();

    $("#login-error").text("");

    if (username === "" || password === "") {
        $("#login-error").text("Please enter username and password.");
        return;
    }

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {

        $("#login-view").hide();
        $("#dashboard-view").show();

        showPage("dashboard");

    } else {
        $("#txt-username").addClass("is-invalid");
        $("#txt-password").addClass("is-invalid");
        $("#login-error").text("Invalid username or password.");
    }
}

function logout() {
    if (!confirm("Are you sure you want to logout?")) return;

    $("#dashboard-view").hide();
    $("#login-view").show();

    $("#txt-username").val("").removeClass("is-invalid");
    $("#txt-password").val("").removeClass("is-invalid");
    $("#login-error").text("");
}


function showPage(pageName) {

    $(".page-section").hide();

    $("#page-" + pageName).show();

    $(".nav-btn").removeClass("active");
    $("#nav-" + pageName).addClass("active");

    if (pageName === "neworder") {
        loadOrderDropdowns();
    }

    if (pageName === "dashboard") {
        updateDashboard();
    }
}


$(document).ready(function () {

    $("#btn-login").on("click", function () {
        login();
    });

    $("#txt-password").on("keypress", function (e) {
        if (e.which === 13) login();
    });
    $("#txt-username").on("keypress", function (e) {
        if (e.which === 13) login();
    });

    $("#txt-username, #txt-password").on("input", function () {
        $(this).removeClass("is-invalid");
        $("#login-error").text("");
    });

});