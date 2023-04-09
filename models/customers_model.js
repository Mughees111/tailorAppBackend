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
    // measurements: {
    //     type: Array,
    //     default: []
    // },
    created_at: {
        type: Date,
        default: Date.now
    },
    is_deleted: {
        type: String,
        default: 0
    },
    is_active: {
        type: String,
        default: 1
    },
    push_id: {
        type: String,
        default: null
    },

});

const Customer = mongoose.model('customers', customersSchema);
module.exports = Customer;
