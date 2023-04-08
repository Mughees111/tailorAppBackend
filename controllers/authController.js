const express = require('express');

const Tailor = require('../models/tailor_model');
const Customer = require('../models/customers_model');
const CustomersTailor = require('../models/customers_tailors_model');
const uploadSinglePic = require('../config/functions');
const baseUrl = require('../config/constants');

const app = express();
const bodyParser = require('body-parser');



app.use(bodyParser.urlencoded({ extended: true }));


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
            if (users?.length) {
                res.json({
                    status: "success",
                    data: users
                });
            }
            else {
                res.json({
                    status: "failed",
                    error: "Invalid username or password"
                });
            }

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
            const tailor = new Tailor(body);
            tailor.save()
                .then(user => {
                    console.log(`New user created: ${user}`);
                    res.json({ status: "success", data: body });
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

    async add_customer(req, res) {
        try {
            const body = req.body;
            if (!body.name) {
                res.json({ status: "failed", error: 'Please enter a valid name' });
                return;
            }
            if (!body.phone) {
                res.json({ status: "failed", error: 'Please enter a valid phone' });
                return;
            }
            if (!body.email) {
                res.json({ status: "failed", error: 'Please enter a valid email' });
                return;
            }
            if (!body.measurements) {
                res.json({ status: "failed", error: 'Please enter at least one measurement' });
                return;
            }
            if (typeof body.measurements !== 'object') {
                console.log(typeof body.measurements)
                res.json({ status: "failed", error: 'Measurements type must be array' });
                return;
            }
            if (!body.user_id) {
                res.json({ status: "failed", error: 'user_id is mandatory' });
                return;
            }
            // IF THE CUSTOMER IS ALREADY EXISTS, I.E ADDED BY ANOTHER TAILOR
            // const checkCustomerExists = await Customer.find({ phone: body.phone });
            // if (checkCustomerExists) {
            //     const custTailorBody = new CustomersTailor({
            //         cust_id: checkCustomerExists._id,
            //         tailor_id: body.user_id
            //     })
            //     custTailorBody.save()
            //         .then(user => {
            //             res.json({ status: "success", error: 'Customer saved successfullt' });

            //         })
            //         .catch(err => {
            //             res.json({ status: "error", error: err.message });
            //         });
            //     return;
            // }

            const customer = new Customer(body);

            customer.save()
                .then(result => {
                    console.log('New record saved with ID:', result._id);
                    const custTailorBody = new CustomersTailor({
                        cust_id: result._id,
                        tailor_id: body.user_id
                    })
                    custTailorBody.save()
                        .then(user => {
                            console.log(`New customerTailor created: ${user}`);
                        })
                        .catch(err => {
                            console.error(`Error creating user: ${err.message}`);
                        });
                    res.json({ status: "success", error: 'Customer saved successfullt' });
                })
                .catch(err => {
                    res.json({ status: "failed", error: err.message });
                });

        } catch (err) {
            console.error(`SignUp API error: ${err.message}`);
            res.status(500).json({ error: 'Server error' });
        }
    },

    async get_tailor_customers(req, res) {
        const body = req.body;
        if (!body.user_id) {
            res.json({ status: "failed", error: 'user_id is mandatory' });
            return;
        }
        const tailorId = body.user_id;
        CustomersTailor.find({ tailor_id: tailorId })
            .then(result => {
                console.log('results arr', result)
                const customerIds = result.map((item) => item.cust_id);
                console.log('customerId', customerIds)
                Customer.find({ _id: { $in: customerIds } })
                    .then(result => {
                        res.json({ status: "success", data: result });
                    })
                    .catch(err => {
                        res.json({ status: "failed", error: err.message });
                    })
            })
            .catch(err => {
                res.json({ status: "failed", error: err.message });
            })
    },

    async add_order(req, res) {
        const imageData = await uploadSinglePic(req, res);
        if (imageData.status == 'failed') {
            res.json({ status: "failed", error: imageData.error });
            return;
        }
        const picUrl = baseUrl.concat(imageData?.data?.path);

        parseFormData(req, res, async () => {
            const imageData = await uploadSinglePic(req, res);
            if (imageData.status == 'failed') {
              res.json({ status: "failed", error: imageData.error });
              return;
            }
            const picUrl = baseUrl.concat(imageData?.data?.path);
            res.json({ status: "success", data: picUrl });
          });
        

        // res.json({ status: "success", data: 'picUrl' });

    }

}

module.exports = authController;