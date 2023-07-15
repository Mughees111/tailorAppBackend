const mongoose = require('mongoose');


const customersSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: "",
        unique: true
    },
    email: {
        type: String,
        default: "3",
        // unique: false
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
        default: ""
    },

});

const Customer = mongoose.model('customers', customersSchema);
module.exports = Customer;
