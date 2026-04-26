

var REGEX = {

    phone: /^[0-9]{10}$/,

    price: /^\d+(\.\d{1,2})?$/,

    qty: /^[0-9]+$/,

    name: /^[a-zA-Z\s]{2,}$/

};

export {REGEX};
// How to use:
// REGEX.phone.test("0771234567")  → true
// REGEX.price.test("abc")         → false