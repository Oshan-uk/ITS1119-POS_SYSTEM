import { customer_db } from '../db/db.js';

class Customer {
    #id;
    #name;
    #phone;
    #address;

    constructor(id, name, phone, address) {
        this.#id      = id;
        this.#name    = name;
        this.#phone   = phone;
        this.#address = address;
    }

    get id()      { return this.#id;      }
    get name()    { return this.#name;    }
    get phone()   { return this.#phone;   }
    get address() { return this.#address; }

    set name(name)       { this.#name    = name;    }
    set phone(phone)     { this.#phone   = phone;   }
    set address(address) { this.#address = address; }
}

const addCustomerData = (id, name, phone, address) => {
    let new_customer = new Customer(id, name, phone, address);
    customer_db.push(new_customer);
}

const updateCustomerData = (id, name, phone, address) => {
    let obj = customer_db.find(item => item.id == id);
    if (obj) {
        obj.name    = name;
        obj.phone   = phone;
        obj.address = address;
    }
}

const deleteCustomerData = (id) => {
    let index = customer_db.findIndex(item => item.id == id);
    if (index !== -1) {
        customer_db.splice(index, 1);
    }
}

const getCustomerData = () => {
    return customer_db;
}

const getCustomerByIndex = (index) => {
    return customer_db[index];
}

const getCustomerById = (id) => {
    return customer_db.find(item => item.id == id);
}

const generateCustomerId = () => {
    return "C" + String(customer_db.length + 1).padStart(3, "0");
}

export {
    addCustomerData, updateCustomerData, deleteCustomerData,
    getCustomerData, getCustomerByIndex, getCustomerById,
    generateCustomerId
};