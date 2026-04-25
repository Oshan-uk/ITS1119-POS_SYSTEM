
function openAddCustomerModal() {
    const newId = generateCustomerId();

    document.getElementById("cust-id").value         = newId;
    document.getElementById("cust-id-display").value = newId;
    document.getElementById("cust-name").value        = "";
    document.getElementById("cust-contact").value     = "";
    document.getElementById("cust-address").value     = "";
    document.getElementById("customerModalLabel").textContent = "Add Customer";

    clearAllErrors();
}

function editCustomer(id) {
    const c = getCustomerById(id);
    if (!c) return;

    document.getElementById("cust-id").value         = c.id;
    document.getElementById("cust-id-display").value = c.id;
    document.getElementById("cust-name").value        = c.name;
    document.getElementById("cust-contact").value     = c.contact;
    document.getElementById("cust-address").value     = c.address;
    document.getElementById("customerModalLabel").textContent = "Edit Customer";

    clearAllErrors();

    new bootstrap.Modal(document.getElementById("customerModal")).show();
}

function saveCustomer() {
    const id      = document.getElementById("cust-id").value.trim();
    const name    = document.getElementById("cust-name").value.trim();
    const contact = document.getElementById("cust-contact").value.trim();
    const address = document.getElementById("cust-address").value.trim();

    if (!validateForm(name, contact, address)) return;

    const alreadyExists = getAllCustomers().some(c => c.id === id);

    if (alreadyExists) {
        updateCustomer({ id, name, contact, address });
        showToast("Customer updated!");
    } else {
        addCustomer({ id, name, contact, address });
        showToast("Customer added!");
    }

    bootstrap.Modal.getInstance(
        document.getElementById("customerModal")
    ).hide();

    renderCustomerTable(getAllCustomers());
}

function deleteCustomerById(id) {
    const c = getCustomerById(id);
    if (!c) return;

    if (!confirm(`Delete "${c.name}"?`)) return;

    deleteCustomer(id);
    renderCustomerTable(getAllCustomers());
    showToast("Customer deleted.");
}

function renderCustomerTable(list) {
    const tbody = document.getElementById("customer-table-body");
    const empty = document.getElementById("customer-empty");

    if (!list || list.length === 0) {
        tbody.innerHTML     = "";
        empty.style.display = "block";
        return;
    }

    empty.style.display = "none";

    tbody.innerHTML = list.map(c => `
        <tr>
            <td>${c.id}</td>
            <td>${c.name}</td>
            <td>${c.contact}</td>
            <td>${c.address}</td>
            <td>
                <button class="btn btn-edit"
                        onclick="editCustomer('${c.id}')">Edit</button>
                <button class="btn btn-delete"
                        onclick="deleteCustomerById('${c.id}')">Delete</button>
            </td>
        </tr>
    `).join("");
}

// live search by name or id
function searchCustomers(keyword) {
    const result = getAllCustomers().filter(c =>
        c.name.toLowerCase().includes(keyword.toLowerCase()) ||
        c.id.toLowerCase().includes(keyword.toLowerCase())
    );
    renderCustomerTable(result);
}

// ── Validation ────────────────────────────────────────────────
function validateForm(name, contact, address) {
    let ok = true;

    if (name === "") {
        showError("cust-name", "err-name", "Name is required");
        ok = false;
    }

    if (contact === "") {
        showError("cust-contact", "err-contact", "Phone number is required");
        ok = false;
    } else if (!/^[0-9]{10}$/.test(contact)) {
        showError("cust-contact", "err-contact", "Must be 10 digits");
        ok = false;
    }

    if (address === "") {
        showError("cust-address", "err-address", "Address is required");
        ok = false;
    }

    return ok;
}

function showError(inputId, errId, msg) {
    document.getElementById(inputId).classList.add("is-invalid");
    document.getElementById(errId).textContent = msg;
}

function clearErr(inputId, errId) {
    document.getElementById(inputId).classList.remove("is-invalid");
    document.getElementById(errId).textContent = "";
}

function clearAllErrors() {
    ["cust-name", "cust-contact", "cust-address"].forEach(id => {
        document.getElementById(id).classList.remove("is-invalid");
    });
    ["err-name", "err-contact", "err-address"].forEach(id => {
        document.getElementById(id).textContent = "";
    });
}

// ── Toast notification ────────────────────────────────────────
function showToast(msg) {
    let box = document.getElementById("toast-msg");
    if (!box) {
        box = document.createElement("div");
        box.id = "toast-msg";
        document.body.appendChild(box);
    }
    box.textContent   = "✓  " + msg;
    box.style.opacity = "1";
    box.style.display = "block";
    clearTimeout(box._t);
    box._t = setTimeout(() => {
        box.style.opacity = "0";
        setTimeout(() => box.style.display = "none", 400);
    }, 2500);
}