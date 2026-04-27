
const customers = [];

class Customer {
    constructor(id, name, phone, address) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.address = address;
    }

    getName() {
        return this.name;
    }

    getPhone() {
        return this.phone;
    }

    getAddress() {
        return this.address;
    }


    setName(name) { this.name = name; }
    setPhone(phone) { this.phone = phone; }
    setAddress(address) { this.address = address; }
}

const addCustomer = (id, name, phone, address) => {

    const exists = customers.some(c => c.id === id);

    if (exists) {
        return false;
    }

    const customer = new Customer(id, name, phone, address);
    customers.push(customer);
    return true;
};

const updateCustomer = (id, name, phone, address) => {
    const c = customers.find(c => c.id === id);
    if (c) {
        c.setName(name);
        c.setPhone(phone);
        c.setAddress(address);
    }
};

const deleteCustomer = (id) => {
    const index = customers.findIndex(c => c.id === id);
    if (index !== -1) {
        customers.splice(index, 1);
    }
};

const getCustomers = () => {
    return customers;
};

const searchCustomer = (keyword) => {
    return customers.filter(c =>
        c.id.toLowerCase().includes(keyword.toLowerCase()) ||
        c.name.toLowerCase().includes(keyword.toLowerCase())
    );
};

export { addCustomer, updateCustomer, deleteCustomer,getCustomers, searchCustomer };