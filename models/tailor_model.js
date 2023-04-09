const mongoose = require('mongoose');


const tailorSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "",
    },
    shop_name: {
        type: String,
        default: "",
    },
    phone: {
        type: String,
        default: "",
        unique: true
    },
    country_code: {
        type: String,
        default: "",
    },
    email: {
        type: String,
        default: "",
        unique: true
    },
    password: {
        type: String,
        default: "",
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    social_login: {
        type: String,
        default: "",
    },
    lat: {
        type: String,
        default: "",
    },
    lng: {
        type: String,
        default: "",
    },
    is_accepted_orders: {
        type: String,
        default: "",
    },
    push_id: {
        type: String,
        default: "",
    },
    profile_pic: {
        type: String,
        default: "",
    },
    is_deleted: {
        type: String,
        default: 0
    },
    is_active: {
        type: String,
        default: 1
    },
    rates: {
        type: Array,
        default: []
    },
    tailor_type: {
        type: String,
        default: null
    },
    api_logged_sess: {
        type: String,
        default: null
    }
});

const Tailor = mongoose.model('tailor', tailorSchema);
module.exports = Tailor;
