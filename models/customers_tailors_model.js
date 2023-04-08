const mongoose = require('mongoose');


const customerTailorSchema = new mongoose.Schema({
    cust_id: {
        type: String,
        default: null
    },
    tailor_id: {
        type: String,
        default: null
    },
});

const CustomersTailor = mongoose.model('customers_tailors', customerTailorSchema);
module.exports = CustomersTailor;
