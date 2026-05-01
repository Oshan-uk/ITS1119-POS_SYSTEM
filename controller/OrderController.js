import { addOrder, getOrders, searchOrder, deleteOrder } from "../model/OrderModel.js";
import { getCustomers } from "../model/CustomerModel.js";
import { getItems, updateItem } from "../model/ItemModel.js";

let cart = [];

const generateId = () => {
    const list = getOrders();
    if (list.length === 0) return "O001";

    const last = list[list.length - 1].id;
    const num = parseInt(last.replace("O", "")) + 1;
    return "O" + String(num).padStart(3, "0");
};

export const populateOrderDropdowns = () => {

    const customerSelect = $("#orderCustomerSelect");
    customerSelect.empty().append('<option value="">Select Customer</option>');
    getCustomers().forEach(c => {
        customerSelect.append(`<option value="${c.id}">${c.id} - ${c.getName()}</option>`);
    });

    const itemSelect = $("#orderItemSelect");
    itemSelect.empty().append('<option value="">Select Item</option>');
    getItems().forEach(i => {
        itemSelect.append(`<option value="${i.id}">${i.id} - ${i.getName()} (Rs. ${i.getPrice()})</option>`);
    });
};

const renderCart = () => {
    const tbody = $("#cartTableBody");
    tbody.empty();

    if (cart.length === 0) {
        tbody.append(`
            <tr id="cartEmptyRow">
                <td colspan="6" class="text-center text-secondary">No items in cart</td>
            </tr>
        `);
        return;
    }

    cart.forEach((item, index) => {
        tbody.append(`
            <tr>
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>Rs. ${parseFloat(item.price).toFixed(2)}</td>
                <td>${item.qty}</td>
                <td>Rs. ${parseFloat(item.subtotal).toFixed(2)}</td>
                <td>
                    <button class="remove-cart-btn" data-id="${item.id}">
                        <i class='bx bx-x'></i> Remove
                    </button>
                </td>
            </tr>
        `);
    });
};

const updateSummary = () => {
    const customerId = $("#orderCustomerSelect").val();
    const customer   = getCustomers().find(c => c.id === customerId);

    const totalItems  = cart.reduce((sum, i) => sum + i.qty, 0);
    const totalAmount = cart.reduce((sum, i) => sum + i.subtotal, 0);

    $("#summaryCustomer").text(customer ? customer.getName() : "—");
    $("#summaryTotalItems").text(totalItems);
    $("#summaryTotal").text(`Rs. ${totalAmount.toFixed(2)}`);
};

const resetOrderForm = () => {
    cart = [];
    $("#orderCustomerSelect").val("");
    $("#orderCustomerPhone").val("");
    $("#orderItemSelect").val("");
    $("#orderItemQty").val(1);
    renderCart();
    updateSummary();
};

$(document).ready(() => {

    $("#orderCustomerSelect").on("change", () => {
        const id = $("#orderCustomerSelect").val();
        const customer = getCustomers().find(c => c.id === id);
        $("#orderCustomerPhone").val(customer ? customer.getPhone() : "");
        updateSummary();
    });

    $("#addToCartBtn").on("click", () => {
        const itemId = $("#orderItemSelect").val();
        const qty    = parseInt($("#orderItemQty").val());

        if (!itemId) {
            alert("Please select an item!");
            return;
        }

        if (!qty || qty < 1) {
            alert("Please enter a valid quantity!");
            return;
        }

        const item = getItems().find(i => i.id === itemId);
        if (!item) return;

        if (qty > item.getQty()) {
            alert(`Only ${item.getQty()} units available in stock!`);
            return;
        }

        const existing = cart.find(c => c.id === itemId);

        if (existing) {
            existing.qty     += qty;
            existing.subtotal = existing.qty * existing.price;
        } else {
            cart.push({
                id:       item.id,
                name:     item.getName(),
                price:    parseFloat(item.getPrice()),
                qty:      qty,
                subtotal: parseFloat(item.getPrice()) * qty
            });
        }

        renderCart();
        updateSummary();

        $("#orderItemSelect").val("");
        $("#orderItemQty").val(1);
    });

    $(document).on("click", ".remove-cart-btn", function () {
        const id = $(this).data("id");
        cart = cart.filter(c => c.id !== id);
        renderCart();
        updateSummary();
    });

    $("#clearOrderBtn").on("click", () => {
        resetOrderForm();
    });

    $("#placeOrderBtn").on("click", () => {
        const customerId = $("#orderCustomerSelect").val();

        if (!customerId) {
            alert("Please select a customer!");
            return;
        }

        if (cart.length === 0) {
            alert("Cart is empty!");
            return;
        }

        const customer    = getCustomers().find(c => c.id === customerId);
        const totalAmount = cart.reduce((sum, i) => sum + i.subtotal, 0);
        const orderId     = generateId();

        cart.forEach(cartItem => {
            const item = getItems().find(i => i.id === cartItem.id);
            if (item) {
                updateItem(item.id, item.getName(), item.getPrice(), item.getQty() - cartItem.qty);
            }
        });

        addOrder(orderId, customerId, customer.getName(), [...cart], totalAmount);

        updateDashboard();
        resetOrderForm();

        alert("Order " + orderId + " placed successfully!");
    });

});

const updateDashboard = () => {
    const orders  = getOrders();
    const revenue = orders.reduce((sum, o) => sum + o.getTotal(), 0);

    $("#totalOrders").text(orders.length);
    $("#totalRevenue").text("Rs. " + revenue.toFixed(2));

    const recent = orders.slice(-5).reverse();
    const tbody  = $("#recentOrdersTable");
    tbody.empty();

    if (recent.length === 0) {
        tbody.append(`<tr><td colspan="4" style="text-align:center; color:gray;">No orders yet</td></tr>`);
        return;
    }

    recent.forEach(o => {
        tbody.append(`
            <tr>
                <td>${o.getId()}</td>
                <td>${o.getCustomerName()}</td>
                <td>Rs. ${o.getTotal().toFixed(2)}</td>
                <td>${o.getDate()}</td>
            </tr>
        `);
    });
};