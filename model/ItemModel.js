import { item_db } from '../db/db.js';

class Item {
    #code;
    #name;
    #price;
    #qty;

    constructor(code, name, price, qty) {
        this.#code  = code;
        this.#name  = name;
        this.#price = price;
        this.#qty   = qty;
    }

    get code()  { return this.#code;  }
    get name()  { return this.#name;  }
    get price() { return this.#price; }
    get qty()   { return this.#qty;   }

    set name(name)   { this.#name  = name;  }
    set price(price) { this.#price = price; }
    set qty(qty)     { this.#qty   = qty;   }
}

const addItemData = (code, name, price, qty) => {
    let new_item = new Item(code, name, parseFloat(price), parseInt(qty));
    item_db.push(new_item);
}

const updateItemData = (code, name, price, qty) => {
    let obj = item_db.find(item => item.code == code);
    if (obj) {
        obj.name  = name;
        obj.price = parseFloat(price);
        obj.qty   = parseInt(qty);
    }
}

const deleteItemData = (code) => {
    let index = item_db.findIndex(item => item.code == code);
    if (index !== -1) {
        item_db.splice(index, 1);
    }
}

const getItemData = () => {
    return item_db;
}

const getItemByIndex = (index) => {
    return item_db[index];
}

const getItemByCode = (code) => {
    return item_db.find(item => item.code == code);
}

const reduceItemStock = (code, qty) => {
    let obj = item_db.find(item => item.code == code);
    if (obj) {
        obj.qty = obj.qty - qty;
    }
}

const generateItemCode = () => {
    return "I" + String(item_db.length + 1).padStart(3, "0");
}

export {
    addItemData, updateItemData, deleteItemData,
    getItemData, getItemByIndex, getItemByCode,
    reduceItemStock, generateItemCode
};