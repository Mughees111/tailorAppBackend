const mongoose = require('mongoose');


const ordersSchema = new mongoose.Schema({
    cust_id: {
        type: String,
        default: null
    },
    tailor_id: {
        type: String,
        default: null
    },
    cust_name: {
        type: String,
        default: null,
    },
    cust_phone: {
        type: String,
        default: null,
    },
    order_measurements: {
        type: Array,
        default: []
    },
    note: {
        type: String,
        default: null,
    },
    total_payment: {
        type: Number || String,
        default: null,
    },
    paid_payment: {
        type: Number || String,
        default: null,
    },
    suit_pic: {
        type: String,
        default: null,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    updated_by: {
        type: String,
        default: null
    }

});

const Orders = mongoose.model('orders', ordersSchema);
module.exports = Orders;
