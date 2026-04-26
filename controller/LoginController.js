import { getCustomerData } from '../model/CustomerModel.js';
import { getItemData }     from '../model/ItemModel.js';
import { getOrderData }    from '../model/OrderModel.js';

const VALID_USER = "admin";
const VALID_PASS = "1234";

document.addEventListener("DOMContentLoaded", () => {

    // LOGIN BUTTON
    $('#login_btn').on('click', function () {
        let username = $('#login_username').val().trim();
        let password = $('#login_password').val().trim();

        if (username === "" || password === "") {
            $('#login_error').text("Please enter username and password.");
            return;
        }

        if (username !== VALID_USER || password !== VALID_PASS) {
            $('#login_error').text("Invalid username or password.");
            return;
        }

        loginSuccess();
    });

    // LOGOUT BUTTON
    $('#logout_btn').on('click', function () {
        Swal.fire({
            title: "Logout?",
            text: "Are you sure you want to logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, logout!"
        }).then((result) => {
            if (result.isConfirmed) {
                $('#dashboard_section').hide();
                $('#login_section').show();
                $('#login_username').val('');
                $('#login_password').val('');
                $('#login_error').text('');
            }
        });
    });

    // SIDEBAR NAVIGATION
    $('#nav_dashboard').on('click', () => showPage('dashboard'));
    $('#nav_customers').on('click', () => showPage('customers'));
    $('#nav_items').on('click',     () => showPage('items'));
    $('#nav_orders').on('click',    () => showPage('orders'));
    $('#nav_history').on('click',   () => showPage('history'));

    // ENTER KEY LOGIN
    $('#login_username, #login_password').on('keypress', function (e) {
        if (e.which === 13) $('#login_btn').click();
    });

    // CLEAR ERROR ON INPUT
    $('#login_username, #login_password').on('input', function () {
        $('#login_error').text('');
    });

});


// ================= FUNCTIONS =================

const loginSuccess = () => {
    $('#login_section').hide();
    $('#dashboard_section').show();
    showPage('dashboard');
};

const showPage = (page) => {
    $('.content_section').hide();
    $('#content_' + page).show();

    $('.sidebar_link').removeClass('active');
    $('#nav_' + page).addClass('active');

    if (page === 'dashboard')  loadDashboard();
    if (page === 'orders')     loadOrderDropdowns();
    if (page === 'history')    loadOrderHistory();
    if (page === 'customers')  loadCustomerTable();
    if (page === 'items')      loadItemTable();
};

const loadDashboard = () => {
    $('#dash_customers').text(getCustomerData().length);
    $('#dash_items').text(getItemData().length);
    $('#dash_orders').text(getOrderData().length);

    let revenue = getOrderData().reduce((sum, o) => sum + o.total, 0);
    $('#dash_revenue').text("Rs." + revenue.toFixed(2));

    let recent = getOrderData().slice(-5).reverse();
    $('#dash_recent_tbody').empty();

    recent.forEach(o => {
        let itemNames = o.items.map(i => i.name).join(", ");
        let row = `<tr>
            <td>${o.orderId}</td>
            <td>${o.customerName}</td>
            <td>${itemNames}</td>
            <td class="text-success fw-bold">Rs.${o.total.toFixed(2)}</td>
            <td>${o.date}</td>
        </tr>`;
        $('#dash_recent_tbody').append(row);
    });
};

export { showPage, loadDashboard };