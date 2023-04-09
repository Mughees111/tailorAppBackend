const express = require('express');
const md5 = require('md5');
const { v4: uuidv4 } = require('uuid');


const Tailor = require('../models/tailor_model');
const Customer = require('../models/customers_model');
const CustomersTailor = require('../models/customers_tailors_model');
const Orders = require('../models/orders_model');
// const uploadSinglePic = require('../config/functions');
const baseUrl = require('../config/constants');
const { uploadSinglePic, isValidUserId } = require('../config/functions');
const Measurement = require('../models/measurements');
// const isValidUserId = require('../config/functions');


const app = express();



const authController = {

    async login_tailor(req, res) {
        try {
            const body = req.body;
            if (body.email == '') {
                res.json({
                    status: "failed",
                    error: "Please enter a valid email"
                });
                return;
            }
            if (body.password == '') {
                res.json({
                    status: "failed",
                    error: "Please enter a valid password"
                });
                return;
            }
            const users = await Tailor.find({ email: body.email, password: body.password });

            const data = await authController.do_sure_login(users[0]?._id ?? '', res);
            if (!data) return;
            res.json({
                status: "success",
                data: data
            });
            // if (users?.length) {
            //     res.json({
            //         status: "success",
            //         data: users
            //     });
            // }
            // else {
            //     res.json({
            //         status: "failed",
            //         error: "Invalid username or password"
            //     });
            // }

        } catch (err) {
            console.error(`Login API error: ${err.message}`);
            res.status(500).json({ error: 'Server error' });
        }
    },

    async signup(req, res) {
        try {
            const body = req.body;
            if (!body.name) {
                res.json({ status: "failed", error: 'Please enter a valid name' });
                return;
            }
            if (!body.shop_name) {
                res.json({ status: "failed", error: 'Please enter a valid shop name' });
                return;
            }
            if (!body.phone) {
                res.json({ status: "failed", error: 'Please enter a valid phone' });
                return;
            }
            if (!body.country_code) {
                res.json({ status: "failed", error: 'Please enter a valid country code' });
                return;
            }
            if (!body.email) {
                res.json({ status: "failed", error: 'Please enter a valid email' });
                return;
            }
            if (!body.password) {
                res.json({ status: "failed", error: 'Please enter a valid password' });
                return;
            }
            if (!body.tailor_type) {
                res.json({ status: "failed", error: 'Tailor type is mandatory' });
                return;
            }
            const tailor = new Tailor(body);
            tailor.save()
                .then(async user => {
                    console.log(`New user created: ${user}`);
                    const data = await authController.do_sure_login(user._id ?? '', res);
                    if (!data) return;
                    res.json({ status: "success", data: data });
                })
                .catch(err => {
                    console.error(`Error creating user: ${err.message}`);
                    res.json({ status: "failed", error: err.message });
                });
        } catch (err) {
            console.error(`SignUp API error: ${err.message}`);
            res.status(500).json({ error: 'Server error' });
        }
    },

    async do_auth(req, res) {
        if (!req.token) {
            res.json({ action: 'failed', error: 'Invalid login credentials' });
            return;
        }
        const user = await Tailor.findOne().and([
            { is_deleted: 0 }, { is_active: 1 }, { api_logged_sess: req.token }
        ])
        if (user) {
            return user[0];
        }
        else {
            res.json({ action: 'failed', error: 'Invalid login credentials' });
            return;
        }
    },

    async do_sure_login(req, res) {
        let user = await Tailor.findOne().and([
            { is_deleted: 0 }, { is_active: 1 }, { _id: req._id }
        ])
        console.log('user ===', user)
        if (!user) {
            res.json({ action: 'failed', error: 'Invalid login credentials' });
            return;
        }
        const myGuid = uuidv4();
        const myHash = md5(myGuid);
        Tailor.updateOne({
            _id: req._id,
            api_logged_sess: myHash
        });
        user.api_logged_sess = myHash;
        return user;

    }

}

module.exports = authController;