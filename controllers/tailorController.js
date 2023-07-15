const multer = require('multer');
const express = require('express');

const Tailor = require('../models/tailor_model');
const Customer = require('../models/customers_model');
const CustomersTailor = require('../models/customers_tailors_model');
const Orders = require('../models/orders_model');
// const uploadSinglePic = require('../config/functions');
const baseUrl = require('../config/constants');
const { uploadSinglePic, isValidUserId } = require('../config/functions');
const Measurement = require('../models/measurements');
const authController = require('./authController');

// const isValidUserId = require('../config/functions');


const app = express();


const tailorController = {

    async add_customer(req, res) {
        const user = await authController.do_auth(req.body, res);
        if (!user) return;

        try {
            const body = req.body;
            // if (!body.user_id) {
            //     res.json({ status: "failed", error: 'user_id is mandatory' });
            //     return;
            // }
            if (!body.name) {
                res.json({ status: "failed", error: 'Please enter a valid name' });
                return;
            }
            if (!body.phone) {
                res.json({ status: "failed", error: 'Please enter a valid phone' });
                return;
            }
            // if (!body.email) {
            //     res.json({ status: "failed", error: 'Please enter a valid email' });
            //     return;
            // }

            // if (!body.measurements) {
            //     res.json({ status: "failed", error: 'Please enter at least one measurement' });
            //     return;
            // }
            // if (typeof body.measurements !== 'object') {
            //     console.log(typeof body.measurements)
            //     res.json({ status: "failed", error: 'Measurements type must be array' });
            //     return;
            // }

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
            console.log('here is thebody', body);

            const customer = new Customer(body);

            customer.save()
                .then(result => {
                    console.log('New record saved with ID:', result._id);
                    const custTailorBody = new CustomersTailor({
                        cust_id: result._id.toString(),
                        tailor_id: user._id.toString()
                    })
                    const measurementsBody = new Measurement({
                        cust_id: result._id,
                        tailor_id: user._id,
                        measurement: body.measurements
                    })
                    custTailorBody.save()
                        .then(user => {
                            console.log(`New customerTailor created: ${user}`);
                        })
                        .catch(err => {
                            console.error(`Error creating user: ${err.message}`);
                        });
                    measurementsBody.save();
                    res.json({ action: "success", message: 'Customer saved successfully' });
                })
                .catch(err => {
                    console.log('error saving customer', err);
                    res.json({ action: "failed", error: err.message });
                });

        } catch (err) {
            console.error(`SignUp API error: ${err.message}`);
            res.status(500).json({ error: 'Server error' });
        }
    },

    async get_tailor_customers(req, res) {
        const user = await authController.do_auth(req.body, res);
        if (!user) return;
        console.log('user_id ===', user._id.toString());
        CustomersTailor.find({ tailor_id: user._id.toString() })
            .then(result => {
                const customerIds = result.map((item) => item.cust_id);
                console.log('customerId', customerIds)
                Customer.find({ _id: { $in: customerIds } })
                    .then(result => {
                        res.json({ action: "success", data: result });
                    })
                    .catch(err => {
                        res.json({ action: "failed", error: err.message });
                    })
            })
            .catch(err => {
                res.json({ action: "failed", error: err.message });
            })
    },

    async get_customer_details(req, res) {
        const user = await authController.do_auth(req.body, res);
        if (!user) return;
        try {
            const body = req.body;
            // if (!body.user_id) {
            //     res.json({ action: "failed", error: 'user_id is mandatory' });
            //     return;
            // }
            // if (!isValidUserId(body.user_id)) {
            //     res.json({ action: "failed", error: 'Invalud user id' });
            //     return;
            // }
            if (!body.cust_id) {
                res.json({ action: "failed", error: 'cust_id is mandatory' });
                return;
            }
            if (!isValidUserId(body.cust_id)) {
                res.json({ action: "failed", error: 'Invalud customer id' });
                return;
            }
            let customerData = await Customer.find({ _id: body.cust_id });
            console.log('customerData', customerData)
            const measurements = await Measurement.find({ cust_id: body.cust_id, tailor_id: user._id });
            console.log('measurements', measurements);
            let data = {
                ...customerData[0]._doc,
                measurements: measurements[0]
            }
            res.json({ action: "success", data: data });
        }
        catch (err) {
            console.log('get_customer_details error===', err)
            res.status(500).json({ error: 'Server error' });
        }

    },

    async add_order(req, res) {

        try {
            const imageData = await uploadSinglePic(req, res);
            if (imageData.status == 'failed') {
                console.log('iamge,im', error)
                res.json({ status: "failed", error: imageData.error });
                return;
            }
            const user = await authController.do_auth(req.body, res);
            console.log('user====', user)
            if (!user) return;
            const picUrl = baseUrl.concat(imageData?.data?.path);
            const body = req.body;
            if (!body.cust_id) {
                res.json({ action: "failed", error: 'Customer id is mandatory' });
                return;
            }
            if (!body.order_measurements) {
                console.log('bodyasd===', body)
                res.json({ action: "failed", error: 'Please enter customer measurements' });
                return;
            }
            if (!isValidUserId(body.cust_id)) {
                res.json({ action: "failed", error: 'Invalid customer id' });
                return;
            }
            // console.log(body.order_measurements);
            // return;
            const getCustomer = await Customer.findById(body.cust_id);
            const dbData = {
                cust_id: body.cust_id,
                tailor_id: user._id,
                order_measurements: body.order_measurements,
                suit_pic: picUrl,
                cust_name: getCustomer?.name,
                cust_phone: getCustomer?.phone,
                order_status: 'on_going',
                note: body.note,
                total_payment: body.total_payment,
                paid_payment: body.paid_payment,
                delivery_date: body.delivery_date ? JSON.parse(body.delivery_date) : null
            };
            console.log('body====', body);
            const order = new Orders(dbData);
            order.save()
                .then(user => {
                    res.json({ action: "success", data: user });
                    console.log(`Order created: ${user}`);
                    return;
                })
                .catch(err => {
                    console.error(`Error creating user: ${err.message}`);
                    res.json({ action: "failed", error: err.message });
                    return;
                });

        }
        catch (err) {
            console.log('err===', err)
            res.status(500).json({ error: 'Server error' });

        }

    }
}
module.exports = tailorController;