import { populateOrderDropdowns, loadOrderHistory } from './OrderController.js';

const USERNAME = "admin";
const PASSWORD = "1234";

AOS.init();


$("#login-btn").on("click", () => {

    const username = $("#username-input").val().trim();
    const password = $("#password-input").val().trim();

    if (!username || !password) {
        $("#message-box").text("⚠️ Enter username and password! ⚠️");
        return;
    }
    if (USERNAME !== username ) {
        $("#message-box").text("⚠️ Enter Correct Username! ⚠️");
        return;
    }

    if (PASSWORD !== password ) {
        $("#message-box").text("⚠️ Enter Correct Password! ⚠️");
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

        const btnPage = btn.textContent.trim().toLowerCase().replace(/\s+/g, '');
        if (btnPage.includes(page)) {
            btn.classList.add('active');
        }
    });

    if (page === 'neworder')     populateOrderDropdowns();
    if (page === 'orderhistory') loadOrderHistory();
}

window.showPage = showPage;


// Date & Time
const updateDateTime = () => {
    const now = new Date();

    const date = now.toLocaleDateString('en-US', {
        weekday: 'short', year: 'numeric',
        month: 'short', day: 'numeric'
    });

    const time = now.toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    });

    $("#sidebar-date").text(date);
    $("#sidebar-time").text(time);
};

setInterval(updateDateTime, 1000);
updateDateTime();