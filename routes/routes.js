const express = require('express');
const router = express.Router();
const UserController = require('../controllers/usersController');
const authController = require('../controllers/authController');
const tailorController = require('../controllers/tailorController');

router.post('/login', authController.login_tailor);
router.post('/signup', authController.signup);
router.post('/addCustomer', tailorController.add_customer);
router.post('/getTailorCustomers', tailorController.get_tailor_customers);
router.post('/getCustomerDetails', tailorController.get_customer_details);
router.post('/addOrder', tailorController.add_order);
// router.post('/users', UserController.getUsers);
// // router.post('/users', UserController.createUser);
// router.get('/users/:id', UserController.getUserById);
// router.put('/users/:id', UserController.updateUser);
// router.delete('/users/:id', UserController.deleteUser);

module.exports = router;