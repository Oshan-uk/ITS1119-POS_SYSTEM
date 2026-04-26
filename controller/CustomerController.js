import {
    addCustomerData, updateCustomerData, deleteCustomerData,
    getCustomerData, getCustomerByIndex, getCustomerById,
    generateCustomerId
} from '../model/CustomerModel.js';

import { check_phone } from '../util/regex_util.js';
import { loadDashboard } from './AuthController.js';

const loadCustomerTable = () => {
    $('#cust_tbody').empty();

    let list = getCustomerData();
    list.map((customer, index) => {
        let row = `<tr data-index="${index}">
            <td>${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.phone}</td>
            <td>${customer.address}</td>
        </tr>`;
        $('#cust_tbody').append(row);
    });
}

const cleanCustomerForm = () => {
    $('#cust_reset_btn').click();
    $('#cust_id').val(generateCustomerId());
}

$('#cust_tbody').on('click', 'tr', function () {
    $('.selected').removeClass('selected');
    $(this).addClass('selected');

    let customer = getCustomerByIndex($(this).index());
    $('#cust_id').val(customer.id);
    $('#cust_name').val(customer.name);
    $('#cust_phone').val(customer.phone);
    $('#cust_address').val(customer.address);
});

$('#cust_save_btn').on('click', function () {
    let id      = $('#cust_id').val();
    let name    = $('#cust_name').val().trim();
    let phone   = $('#cust_phone').val().trim();
    let address = $('#cust_address').val().trim();

    (id == "")                 ? Swal.fire({ icon: "error", title: "ID is missing!" }) :
        (getCustomerById(id))      ? Swal.fire({ icon: "error", title: "ID already exists!" }) :
            (name == "")               ? Swal.fire({ icon: "error", title: "Name is required!" }) :
                (!check_phone(phone))      ? Swal.fire({ icon: "error", title: "Invalid phone number!" }) :
                    (address == "")            ? Swal.fire({ icon: "error", title: "Address is required!" }) :
                        (() => {
                            addCustomerData(id, name, phone, address);
                            Swal.fire({ icon: "success", title: "Customer saved!" });
                            cleanCustomerForm();
                            loadCustomerTable();
                            loadDashboard();
                        })();
});

$('#cust_update_btn').on('click', function () {
    let id      = $('#cust_id').val();
    let name    = $('#cust_name').val().trim();
    let phone   = $('#cust_phone').val().trim();
    let address = $('#cust_address').val().trim();

    (id == "")                 ? Swal.fire({ icon: "error", title: "Select a customer first!" }) :
        (!getCustomerById(id))     ? Swal.fire({ icon: "error", title: "Customer not found!" }) :
            (name == "")               ? Swal.fire({ icon: "error", title: "Name is required!" }) :
                (!check_phone(phone))      ? Swal.fire({ icon: "error", title: "Invalid phone number!" }) :
                    (address == "")            ? Swal.fire({ icon: "error", title: "Address is required!" }) :
                        (() => {
                            updateCustomerData(id, name, phone, address);
                            Swal.fire({ icon: "success", title: "Customer updated!" });
                            cleanCustomerForm();
                            loadCustomerTable();
                        })();
});

$('#cust_delete_btn').on('click', function () {
    let id = $('#cust_id').val();

    Swal.fire({
        title: "Are you sure?",
        text: "This customer will be removed!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete!"
    }).then((result) => {
        if (result.isConfirmed) {
            (id == "")             ? Swal.fire({ icon: "error", title: "Select a customer first!" }) :
                (!getCustomerById(id)) ? Swal.fire({ icon: "error", title: "Customer not found!" }) :
                    (() => {
                        deleteCustomerData(id);
                        Swal.fire({ icon: "success", title: "Customer deleted!" });
                        cleanCustomerForm();
                        loadCustomerTable();
                        loadDashboard();
                    })();
        }
    });
});

$('#cust_search').on('input', function () {
    let keyword = $(this).val().toLowerCase();
    $('#cust_tbody tr').filter(function () {
        $(this).toggle($(this).text().toLowerCase().includes(keyword));
    });
});

$(document).ready(function () {
    $('#cust_id').val(generateCustomerId());
});

export { loadCustomerTable };