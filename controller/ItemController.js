
function openAddItemModal() {

    var newCode = generateItemCode();

    $("#item-code").val(newCode);
    $("#item-code-display").val(newCode);
    $("#item-name").val("");
    $("#item-price").val("");
    $("#item-qty").val("");

    $("#item-modal-title").text("Add Item");

    clearItemErrors();
}


function openEditItemModal(code) {

    var item = getItemByCode(code);

    if (!item) return;

    $("#item-code").val(item.code);
    $("#item-code-display").val(item.code);
    $("#item-name").val(item.name);
    $("#item-price").val(item.price);
    $("#item-qty").val(item.qty);

    $("#item-modal-title").text("Edit Item");

    clearItemErrors();

    var modal = new bootstrap.Modal(
        document.getElementById("modal-item")
    );
    modal.show();
}


function saveItem() {

    var code  = $("#item-code").val().trim();
    var name  = $("#item-name").val().trim();
    var price = $("#item-price").val().trim();
    var qty   = $("#item-qty").val().trim();

    if (!validateItemForm(name, price, qty)) return;

    var priceNum = parseFloat(price);
    var qtyNum   = parseInt(qty);

    var existing = getItemByCode(code);

    if (existing) {
        updateItem({
            code  : code,
            name  : name,
            price : priceNum,
            qty   : qtyNum
        });
        showToast("Item updated successfully!");
    } else {
        addItem({
            code  : code,
            name  : name,
            price : priceNum,
            qty   : qtyNum
        });
        showToast("Item added successfully!");
    }

    bootstrap.Modal.getInstance(
        document.getElementById("modal-item")
    ).hide();

    renderItemTable(getAllItems());

    updateDashboard();
}


function deleteItemByCode(code) {

    var item = getItemByCode(code);
    if (!item) return;

    if (!confirm('Delete item "' + item.name + '"?')) return;

    deleteItem(code);
    renderItemTable(getAllItems());
    updateDashboard();
    showToast("Item deleted.");
}


function renderItemTable(list) {

    var tbody = $("#item-tbody");

    if (!list || list.length === 0) {
        tbody.html(
            '<tr><td colspan="5" class="empty-row">No items yet.</td></tr>'
        );
        return;
    }

    var rows = "";

    list.forEach(function (item) {

        var stockClass = "stock-ok";
        if (item.qty === 0)        stockClass = "stock-empty";
        else if (item.qty <= 10)   stockClass = "stock-low";

        rows += "<tr>";
        rows += "<td><span class='id-badge'>" + item.code + "</span></td>";
        rows += "<td><strong>" + item.name + "</strong></td>";
        rows += "<td><span class='price-text'>Rs." +
            parseFloat(item.price).toFixed(2) + "</span></td>";
        rows += "<td><span class='stock-badge " + stockClass + "'>" +
            item.qty + "</span></td>";
        rows += "<td>";
        rows += "<button class='btn-edit-row' " +
            "onclick='openEditItemModal(\"" + item.code + "\")'>" +
            "Edit</button>";
        rows += "<button class='btn-delete-row' " +
            "onclick='deleteItemByCode(\"" + item.code + "\")'>" +
            "Delete</button>";
        rows += "</td>";
        rows += "</tr>";
    });

    tbody.html(rows);
}


function searchItems(keyword) {

    var result = getAllItems().filter(function (i) {
        var kw = keyword.toLowerCase();
        return i.name.toLowerCase().includes(kw) ||
            i.code.toLowerCase().includes(kw);
    });

    renderItemTable(result);
}


function validateItemForm(name, price, qty) {

    var valid = true;

    if (name === "") {
        showItemFieldError("item-name", "err-item-name", "Item name is required.");
        valid = false;
    }

    if (price === "") {
        showItemFieldError("item-price", "err-item-price", "Price is required.");
        valid = false;
    } else if (!REGEX.price.test(price) || parseFloat(price) < 0) {
        showItemFieldError("item-price", "err-item-price", "Enter a valid price.");
        valid = false;
    }

    if (qty === "") {
        showItemFieldError("item-qty", "err-item-qty", "Quantity is required.");
        valid = false;
    } else if (!REGEX.qty.test(qty)) {
        showItemFieldError("item-qty", "err-item-qty", "Enter a valid quantity.");
        valid = false;
    }

    return valid;
}



function showItemFieldError(inputId, errId, message) {
    $("#" + inputId).addClass("is-invalid");
    $("#" + errId).text(message);
}

function clearItemErrors() {
    $("#item-name, #item-price, #item-qty").removeClass("is-invalid");
    $("#err-item-name, #err-item-price, #err-item-qty").text("");
}


$(document).ready(function () {

    $("#item-search").on("input", function () {
        searchItems($(this).val());
    });

    $("#item-name").on("input", function () {
        $(this).removeClass("is-invalid");
        $("#err-item-name").text("");
    });
    $("#item-price").on("input", function () {
        $(this).removeClass("is-invalid");
        $("#err-item-price").text("");
    });
    $("#item-qty").on("input", function () {
        $(this).removeClass("is-invalid");
        $("#err-item-qty").text("");
    });

});