import {
    addItem,
    updateItem,
    deleteItem,
    getItems,
    searchItem
} from "../model/ItemModel.js";

let selectedItemId = null;

const loadTable = (data) => {
    const tbody = $("#itemsTableBody");
    tbody.empty();

    if (data.length === 0) {
        tbody.append(`<tr><td colspan="4" class="text-center">No items</td></tr>`);
        return;
    }

    data.forEach(i => {
        tbody.append(`
            <tr>
                <td>${i.id}</td>
                <td>${i.getName()}</td>
                <td>${i.getPrice()}</td>
                <td>${i.getQty()}</td>
            </tr>
        `);
    });

    $("#totalItems").text(getItems().length);
};

const generateId = () => {
    const list = getItems();
    if (list.length === 0) return "I001";

    const last = list[list.length - 1].id;
    const num = parseInt(last.replace("I", "")) + 1;
    return "I" + String(num).padStart(3, "0");
};

const resetForm = () => {
    selectedItemId = null;
    $("#itemId").val(generateId());
    $("#itemName").val("");
    $("#itemPrice").val("");
    $("#itemQty").val("");
};

$(document).ready(() => {

    resetForm();
    loadTable(getItems());

    $("#addItemBtn").click(() => {
        const id = $("#itemId").val().trim();
        const name = $("#itemName").val().trim();
        const price = $("#itemPrice").val().trim();
        const qty = $("#itemQty").val().trim();

        if (!name || !price || !qty) {
            alert("Fill all fields");
            return;
        }

        if (!addItem(id, name, price, qty)) {
            alert("Item already exists!");
            return;
        }

        loadTable(getItems());
        resetForm();
    });

    $("#itemsTableBody").on("click", "tr", function () {

        $("#itemsTableBody tr").removeClass("table-active");
        $(this).addClass("table-active");

        const id = $(this).find("td:eq(0)").text();
        const item = getItems().find(i => i.id === id);

        if (item) {
            selectedItemId = id;

            $("#itemId").val(item.id);
            $("#itemName").val(item.getName());
            $("#itemPrice").val(item.getPrice());
            $("#itemQty").val(item.getQty());
        }
    });

    $("#updateItemBtn").click(() => {
        if (!selectedItemId) {
            alert("Select item first");
            return;
        }

        updateItem(
            selectedItemId,
            $("#itemName").val(),
            $("#itemPrice").val(),
            $("#itemQty").val()
        );

        loadTable(getItems());
        resetForm();
    });

    $("#deleteItemBtn").click(() => {
        if (!selectedItemId) {
            alert("Select item first");
            return;
        }

        deleteItem(selectedItemId);
        loadTable(getItems());
        resetForm();
    });

    $("#searchItemBtn").click(() => {
        loadTable(searchItem($("#searchItemInput").val()));
    });

    $("#showAllItemsBtn").click(() => {
        loadTable(getItems());
    });

});