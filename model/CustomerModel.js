import db from "../db/db.js";
class Customer {
    constructor(id, name, phone, address) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.address = address;
    }

    getName() { return this.name; }
    getPhone() { return this.phone; }
    getAddress() { return this.address; }

    setName(name) { this.name = name; }
    setPhone(phone) { this.phone = phone; }
    setAddress(address) { this.address = address; }
}

const addCustomer = (id, name, phone, address) => {

    const exists = db.customers.some(c => c.id === id);

    if (exists) return false;

    db.customers.push(new Customer(id, name, phone, address));
    return true;
};

const updateCustomer = (id, name, phone, address) => {
    const c = db.customers.find(c => c.id === id);
    if (c) {
        c.setName(name);
        c.setPhone(phone);
        c.setAddress(address);
    }
};

const deleteCustomer = (id) => {
    const index = db.customers.findIndex(c => c.id === id);
    if (index !== -1) db.customers.splice(index, 1);
};

const getCustomers = () => db.customers;

const searchCustomer = (keyword) => {
    return db.customers.filter(c =>
        c.id.toLowerCase().includes(keyword.toLowerCase()) ||
        c.name.toLowerCase().includes(keyword.toLowerCase())
    );
};

export { addCustomer, updateCustomer, deleteCustomer, getCustomers, searchCustomer };