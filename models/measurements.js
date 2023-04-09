const mongoose = require('mongoose');


const measurementsSchema = new mongoose.Schema({
    cust_id: {
        type: String,
        default: null
    },
    tailor_id: {
        type: String,
        default: null,
    },
    measurement: {
        type: Array,
        default: []
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Measurement = mongoose.model('measurement', measurementsSchema);
module.exports = Measurement;
