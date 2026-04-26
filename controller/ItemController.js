import {
    addItemData, updateItemData, deleteItemData,
    getItemData, getItemByIndex, getItemByCode,
    generateItemCode
} from '../model/ItemModel.js';

import { check_price, check_qty } from '../util/regex_util.js';
import { loadDashboard } from './LoginController.js';

const loadItemTable = () => {
    $('#item_tbody').empty();

    let list = getItemData();
    list.map((item, index) => {
        let row = `<tr data-index="${index}">
            <td>${item.code}</td>
            <td>${item.name}</td>
            <td>Rs.${parseFloat(item.price).toFixed(2)}</td>
            <td>${item.qty}</td>
        </tr>`;
        $('#item_tbody').append(row);
    });
}

const cleanItemForm = () => {
    $('#item_reset_btn').click();
    $('#item_code').val(generateItemCode());
}

$('#item_tbody').on('click', 'tr', function () {
    $('.selected').removeClass('selected');
    $(this).addClass('selected');

    let item = getItemByIndex($(this).index());
    $('#item_code').val(item.code);
    $('#item_name').val(item.name);
    $('#item_price').val(item.price);
    $('#item_qty').val(item.qty);
});

$('#item_save_btn').on('click', function () {
    let code  = $('#item_code').val();
    let name  = $('#item_name').val().trim();
    let price = $('#item_price').val().trim();
    let qty   = $('#item_qty').val().trim();

    (code == "")           ? Swal.fire({ icon: "error", title: "Code is missing!" }) :
        (getItemByCode(code))  ? Swal.fire({ icon: "error", title: "Code already exists!" }) :
            (name == "")           ? Swal.fire({ icon: "error", title: "Name is required!" }) :
                (!check_price(price))  ? Swal.fire({ icon: "error", title: "Invalid price!" }) :
                    (!check_qty(qty))      ? Swal.fire({ icon: "error", title: "Invalid quantity!" }) :
                        (() => {
                            addItemData(code, name, price, qty);
                            Swal.fire({ icon: "success", title: "Item saved!" });
                            cleanItemForm();
                            loadItemTable();
                            loadDashboard();
                        })();
});

$('#item_update_btn').on('click', function () {
    let code  = $('#item_code').val();
    let name  = $('#item_name').val().trim();
    let price = $('#item_price').val().trim();
    let qty   = $('#item_qty').val().trim();

    (code == "")           ? Swal.fire({ icon: "error", title: "Select an item first!" }) :
        (!getItemByCode(code)) ? Swal.fire({ icon: "error", title: "Item not found!" }) :
            (name == "")           ? Swal.fire({ icon: "error", title: "Name is required!" }) :
                (!check_price(price))  ? Swal.fire({ icon: "error", title: "Invalid price!" }) :
                    (!check_qty(qty))      ? Swal.fire({ icon: "error", title: "Invalid quantity!" }) :
                        (() => {
                            updateItemData(code, name, price, qty);
                            Swal.fire({ icon: "success", title: "Item updated!" });
                            cleanItemForm();
                            loadItemTable();
                        })();
});

$('#item_delete_btn').on('click', function () {
    let code = $('#item_code').val();

    Swal.fire({
        title: "Are you sure?",
        text: "This item will be removed!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete!"
    }).then((result) => {
        if (result.isConfirmed) {
            (code == "")           ? Swal.fire({ icon: "error", title: "Select an item first!" }) :
                (!getItemByCode(code)) ? Swal.fire({ icon: "error", title: "Item not found!" }) :
                    (() => {
                        deleteItemData(code);
                        Swal.fire({ icon: "success", title: "Item deleted!" });
                        cleanItemForm();
                        loadItemTable();
                        loadDashboard();
                    })();
        }
    });
});

$('#item_search').on('input', function () {
    let keyword = $(this).val().toLowerCase();
    $('#item_tbody tr').filter(function () {
        $(this).toggle($(this).text().toLowerCase().includes(keyword));
    });
});

$(document).ready(function () {
    $('#item_code').val(generateItemCode());
});

export { loadItemTable };