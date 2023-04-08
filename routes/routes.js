const express = require('express');
const router = express.Router();
const UserController = require('../controllers/usersController');
const authController = require('../controllers/authController');

router.post('/login', authController.login_tailor);
router.post('/signup', authController.signup);
router.post('/addCustomer', authController.add_customer);
router.post('/getTailorCustomers', authController.get_tailor_customers);
router.post('/add_order', authController.add_order);
// router.post('/users', UserController.getUsers);
// // router.post('/users', UserController.createUser);
// router.get('/users/:id', UserController.getUserById);
// router.put('/users/:id', UserController.updateUser);
// router.delete('/users/:id', UserController.deleteUser);

module.exports = router;