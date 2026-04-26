function addItem(obj) {
    items.push(obj);
}

function getAllItems() {
    return items;
}

function getItemByCode(code) {
    return items.find(function (i) {
        return i.code === code;
    });
}

function updateItem(updatedObj) {
    items = items.map(function (i) {
        return i.code === updatedObj.code ? updatedObj : i;
    });
}

function deleteItem(code) {
    items = items.filter(function (i) {
        return i.code !== code;
    });
}

function reduceStock(code, qty) {
    var item = getItemByCode(code);
    if (item) {
        item.qty = item.qty - qty;
    }
}

function generateItemCode() {
    var num = items.length + 1;
    return "I" + String(num).padStart(3, "0");
}