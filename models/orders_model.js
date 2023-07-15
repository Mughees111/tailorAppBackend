const mongoose = require('mongoose');


const ordersSchema = new mongoose.Schema({
    cust_id: {
        type: String,
        default: ""
    },
    tailor_id: {
        type: String,
        default: ""
    },
    cust_name: {
        type: String,
        default: "",
    },
    cust_phone: {
        type: String,
        default: "",
    },
    order_measurements: {
        type: Array,
        default: []
    },
    note: {
        type: String,
        default: "",
    },
    order_status: {
        type: String,
        default: "",
    },

    total_payment: {
        type: Number || String,
        default: "",
    },
    paid_payment: {
        type: Number || String,
        default: "",
    },
    suit_pic: {
        type: String,
        default: "",
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
        default: ""
    },
    delivery_date: {
        type: Date || String,
        default: ""
    }

});

const Orders = mongoose.model('orders', ordersSchema);
module.exports = Orders;
