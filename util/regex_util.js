const phone_regex = new RegExp("^[0]{1}[7]{1}[01245678]{1}[0-9]{7}$");
const price_regex = new RegExp("^\\d+(\\.\\d{1,2})?$");
const qty_regex   = new RegExp("^[0-9]+$");


const check_phone = (phone) => { return phone_regex.test(phone); }
const check_price = (price) => { return price_regex.test(price); }
const check_qty   = (qty)   => { return qty_regex.test(qty);     }

export { check_phone, check_price, check_qty };