import {
    addCustomer,
    getCustomers,
    searchCustomer,
    updateCustomer,
    deleteCustomer
} from "../model/CustomerModel.js";

let selectedId = null;

const loadTable = (data) => {
    const tbody = $("#customersTableBody");
    tbody.empty();

    if (data.length === 0) {
        tbody.append(`<tr><td colspan="4" class="text-center">No customers</td></tr>`);
        return;
    }

    data.forEach(c => {
        tbody.append(`
            <tr>
                <td>${c.id}</td>
                <td>${c.getName()}</td>
                <td>${c.getPhone()}</td>
                <td>${c.getAddress()}</td>
            </tr>
        `);
    });

    updateDashboard();
};

const updateDashboard = () => {
    $("#totalCustomers").text(getCustomers().length);
};

const generateId = () => {
    const list = getCustomers();
    if (list.length === 0) return "C001";

    const last = list[list.length - 1].id;
    const num = parseInt(last.replace("C", "")) + 1;
    return "C" + String(num).padStart(3, "0");
};

const resetForm = () => {
    selectedId = null;
    $("#custId").val(generateId());
    $("#custName").val("");
    $("#custPhone").val("");
    $("#custEmail").val("");
};

$(document).ready(() => {

    resetForm();
    loadTable(getCustomers());

    $("#addCustomerBtn").click(() => {
        const id = $("#custId").val().trim();
        const name = $("#custName").val().trim();
        const phone = $("#custPhone").val().trim();
        const address = $("#custEmail").val().trim();

        if (!name || !phone || !address) {
            alert("Fill all fields");
            return;
        }

        const success = addCustomer(id, name, phone, address);

        if (!success) {
            alert("Customer already exists!");
            return;
        }

        loadTable(getCustomers());
        resetForm();
    });

    $("#customersTableBody").on("click", "tr", function () {

        $("#customersTableBody tr").removeClass("table-active"); // remove old
        $(this).addClass("table-active"); // highlight

        const id = $(this).find("td:eq(0)").text();
        const customer = getCustomers().find(c => c.id === id);

        if (customer) {
            selectedId = id;

            $("#custId").val(customer.id);
            $("#custName").val(customer.getName());
            $("#custPhone").val(customer.getPhone());
            $("#custEmail").val(customer.getAddress());
        }
        resetForm();

    });

    $("#updateCustomerBtn").click(() => {
        if (!selectedId) {
            alert("Select a customer first");
            return;
        }

        const name = $("#custName").val().trim();
        const phone = $("#custPhone").val().trim();
        const address = $("#custEmail").val().trim();

        updateCustomer(selectedId, name, phone, address);
        loadTable(getCustomers());
        resetForm();
    });

    $("#deleteCustomerBtn").click(() => {
        if (!selectedId) {
            alert("Select a customer first");
            return;
        }

        deleteCustomer(selectedId);
        loadTable(getCustomers());
        resetForm();
    });

    $("#searchCustomerBtn").click(() => {
        const keyword = $("#searchCustomerInput").val().trim();
        loadTable(searchCustomer(keyword));
    });

    $("#showAllCustomersBtn").click(() => {
        loadTable(getCustomers());
        resetForm();
    });

});