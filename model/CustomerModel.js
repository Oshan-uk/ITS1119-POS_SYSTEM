import {customers} from "../db/db";

function addCustomer(obj) {
    customers.push(obj);
}

function getAllCustomers() {
    return customers;
}

function getCustomerById(id) {
    return customers.find(function (c) {
        return c.id === id;
    });
}

function updateCustomer(updatedObj) {
    customers = customers.map(function (c) {
        return c.id === updatedObj.id ? updatedObj : c;
    });
}

function deleteCustomer(id) {
    customers = customers.filter(function (c) {
        return c.id !== id;
    });
}

function generateCustomerId() {
    var num = customers.length + 1;
    return "C" + String(num).padStart(3, "0");
}

export {addCustomer,getAllCustomers,getCustomerById,updateCustomer,deleteCustomer,generateCustomerId}