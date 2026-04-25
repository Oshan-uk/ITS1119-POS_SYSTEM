
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

    if (pageName === "dashboard")    { updateDashboard(); }
    if (pageName === "neworder")     { loadOrderDropdowns(); }
    if (pageName === "orderhistory") { renderOrderHistory(); }
}


function updateDashboard() {

    $("#stat-customers").text(getAllCustomers().length);
    $("#stat-items").text(getAllItems().length);
    $("#stat-orders").text(getAllOrders().length);

    var revenue = 0;
    getAllOrders().forEach(function (o) {
        revenue += o.total;
    });
    $("#stat-revenue").text("Rs." + revenue.toFixed(2));

    var recent = getAllOrders().slice(-5).reverse();
    var tbody  = $("#dash-recent-tbody");

    if (recent.length === 0) {
        tbody.html('<tr><td colspan="5" class="empty-row">No orders yet.</td></tr>');
        return;
    }

    var rows = "";
    recent.forEach(function (o) {
        var itemNames = o.items.map(function (i) {
            return i.name;
        }).join(", ");

        rows += "<tr>";
        rows += "<td><span class='id-badge'>" + o.orderId  + "</span></td>";
        rows += "<td>" + o.custName + "</td>";
        rows += "<td>" + itemNames  + "</td>";
        rows += "<td class='text-success fw-semibold'>Rs." + o.total.toFixed(2) + "</td>";
        rows += "<td>" + o.date     + "</td>";
        rows += "</tr>";
    });

    tbody.html(rows);
}



function showToast(message) {

    var box = $("#toast-msg");

    if (box.length === 0) {
        $("body").append('<div id="toast-msg"></div>');
        box = $("#toast-msg");
    }

    box.text("✓  " + message).fadeIn(200);

    setTimeout(function () {
        box.fadeOut(400);
    }, 2500);
}



$(document).ready(function () {

    $("#btn-login").on("click", function () {
        login();
    });

    $("#txt-username, #txt-password").on("keypress", function (e) {
        if (e.which === 13) login();
    });

    $("#txt-username, #txt-password").on("input", function () {
        $(this).removeClass("is-invalid");
        $("#login-error").text("");
    });

});