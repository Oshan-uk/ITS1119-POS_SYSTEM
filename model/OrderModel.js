import db from "../db/db.js";

class Order {
    constructor(id, customerId, customerName, items, total, date) {
        this.id = id;
        this.customerId = customerId;
        this.customerName = customerName;
        this.items = items;
        this.total = total;
        this.date = date;
    }

    getId() { return this.id; }
    getCustomerId() { return this.customerId; }
    getCustomerName() { return this.customerName; }
    getItems() { return this.items; }
    getTotal() { return this.total; }
    getDate() { return this.date; }
}

const addOrder = (id, customerId, customerName, items, total) => {
    if (db.orders.some(o => o.id === id)) return false;

    db.orders.push(
        new Order(
            id,
            customerId,
            customerName,
            items,
            total,
            new Date().toLocaleDateString()
        )
    );

    return true;
};

const getOrders = () => db.orders;

const getOrderById = (id) =>
    db.orders.find(o => o.id === id);

const deleteOrder = (id) => {
    const index = db.orders.findIndex(o => o.id === id);
    if (index !== -1) db.orders.splice(index, 1);
};

const searchOrder = (keyword) => {
    const key = keyword.toLowerCase();

    return db.orders.filter(o =>
        o.id.toLowerCase().includes(key) ||
        o.customerName.toLowerCase().includes(key)
    );
};

export { addOrder, getOrders, getOrderById, deleteOrder, searchOrder };