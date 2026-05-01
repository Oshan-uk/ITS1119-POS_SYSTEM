import db from "../db/db.js";

class Item {
    constructor(id, name, price, qty) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.qty = qty;
    }

    getName() { return this.name; }
    getPrice() { return parseFloat(this.price); }
    getQty() { return parseInt(this.qty); }

    setName(name) { this.name = name; }
    setPrice(price) { this.price = price; }
    setQty(qty) { this.qty = qty; }
}

const addItem = (id, name, price, qty) => {

    const exists = db.items.some(i => i.id === id);

    if (exists) return false;

    db.items.push(new Item(id, name, price, qty));
    return true;
};

const updateItem = (id, name, price, qty) => {
    const i = db.items.find(i => i.id === id);
    if (i) {
        i.setName(name);
        i.setPrice(price);
        i.setQty(qty);
    }
};

const deleteItem = (id) => {
    const index = db.items.findIndex(i => i.id === id);
    if (index !== -1) db.items.splice(index, 1);
};

const getItems = () => db.items;

const searchItem = (keyword) => {
    return db.items.filter(i =>
        i.id.toLowerCase().includes(keyword.toLowerCase()) ||
        i.name.toLowerCase().includes(keyword.toLowerCase())
    );
};

export { addItem, updateItem, deleteItem, getItems, searchItem };