const db = window.appDB || {
    customers: [],
    items: [],
    orders: []
};

window.appDB = db;

export default db;