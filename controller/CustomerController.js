

function openAddCustomerModal() {

    var newId = generateCustomerId();

    $("#cust-id").val(newId);
    $("#cust-id-display").val(newId);
    $("#cust-name").val("");
    $("#cust-phone").val("");
    $("#cust-address").val("");

    $("#customer-modal-title").text("Add Customer");

    clearCustomerErrors();
}


function openEditCustomerModal(id) {

    var c = getCustomerById(id);
    if (!c) return;

    $("#cust-id").val(c.id);
    $("#cust-id-display").val(c.id);
    $("#cust-name").val(c.name);
    $("#cust-phone").val(c.phone);
    $("#cust-address").val(c.address);

    $("#customer-modal-title").text("Edit Customer");

    clearCustomerErrors();

    var modal = new bootstrap.Modal(
        document.getElementById("modal-customer")
    );
    modal.show();
}


function saveCustomer() {

    var id      = $("#cust-id").val().trim();
    var name    = $("#cust-name").val().trim();
    var phone   = $("#cust-phone").val().trim();
    var address = $("#cust-address").val().trim();

    if (!validateCustomerForm(name, phone, address)) return;

    var existing = getCustomerById(id);

    if (existing) {
        updateCustomer({ id: id, name: name, phone: phone, address: address });
        showToast("Customer updated successfully!");
    } else {
        addCustomer({ id: id, name: name, phone: phone, address: address });
        showToast("Customer added successfully!");
    }

    bootstrap.Modal.getInstance(
        document.getElementById("modal-customer")
    ).hide();

    renderCustomerTable(getAllCustomers());

    updateDashboard();
}


function deleteCustomerById(id) {

    var c = getCustomerById(id);
    if (!c) return;

    if (!confirm('Delete customer "' + c.name + '"?')) return;

    deleteCustomer(id);
    renderCustomerTable(getAllCustomers());
    updateDashboard();
    showToast("Customer deleted.");
}


function renderCustomerTable(list) {

    var tbody = $("#customer-tbody");

    if (!list || list.length === 0) {
        tbody.html(
            '<tr><td colspan="5" class="empty-row">No customers yet.</td></tr>'
        );
        return;
    }

    var rows = "";

    list.forEach(function (c) {
        rows += "<tr>";
        rows += "<td><span class='id-badge'>" + c.id + "</span></td>";
        rows += "<td><strong>" + c.name + "</strong></td>";
        rows += "<td>" + c.phone + "</td>";
        rows += "<td>" + c.address + "</td>";
        rows += "<td>";
        rows += "<button class='btn-edit-row' " +
            "onclick='openEditCustomerModal(\"" + c.id + "\")'>" +
            "Edit</button>";
        rows += "<button class='btn-delete-row' " +
            "onclick='deleteCustomerById(\"" + c.id + "\")'>" +
            "Delete</button>";
        rows += "</td>";
        rows += "</tr>";
    });

    tbody.html(rows);
}


function searchCustomers(keyword) {

    var result = getAllCustomers().filter(function (c) {
        var kw = keyword.toLowerCase();
        return c.name.toLowerCase().includes(kw) ||
            c.id.toLowerCase().includes(kw);
    });

    renderCustomerTable(result);
}


function validateCustomerForm(name, phone, address) {

    var valid = true;

    if (name === "") {
        showCustomerFieldError("cust-name", "err-cust-name", "Name is required.");
        valid = false;
    }

    if (phone === "") {
        showCustomerFieldError("cust-phone", "err-cust-phone", "Phone is required.");
        valid = false;
    } else if (!REGEX.phone.test(phone)) {
        showCustomerFieldError("cust-phone", "err-cust-phone", "Must be 10 digits.");
        valid = false;
    }

    if (address === "") {
        showCustomerFieldError("cust-address", "err-cust-address", "Address is required.");
        valid = false;
    }

    return valid;
}



function showCustomerFieldError(inputId, errId, message) {
    $("#" + inputId).addClass("is-invalid");
    $("#" + errId).text(message);
}

function clearCustomerErrors() {
    $("#cust-name, #cust-phone, #cust-address").removeClass("is-invalid");
    $("#err-cust-name, #err-cust-phone, #err-cust-address").text("");
}


$(document).ready(function () {

    $("#customer-search").on("input", function () {
        searchCustomers($(this).val());
    });

    $("#cust-name").on("input", function () {
        $(this).removeClass("is-invalid");
        $("#err-cust-name").text("");
    });
    $("#cust-phone").on("input", function () {
        $(this).removeClass("is-invalid");
        $("#err-cust-phone").text("");
    });
    $("#cust-address").on("input", function () {
        $(this).removeClass("is-invalid");
        $("#err-cust-address").text("");
    });

});