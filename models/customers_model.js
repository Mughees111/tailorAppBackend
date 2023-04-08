const mongoose = require('mongoose');


const customersSchema = new mongoose.Schema({
    name: {
        type: String,
        default: null
    },
    phone: {
        type: String,
        default: null,
        unique: true
    },
    email: {
        type: String,
        default: null,
        unique: true
    },
    measurements: {
        type: Array,
        default: []
    },
});

const Customer = mongoose.model('customers', customersSchema);
module.exports = Customer;
