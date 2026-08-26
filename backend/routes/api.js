const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.post('/b2b-inquiry', apiController.handleB2BInquiry);
router.get('/cham-products', apiController.getChamProducts);
router.post('/auth/register', apiController.registerUser);
router.post('/auth/login', apiController.loginUser);
router.get('/meal-plan', apiController.getMealPlan);
router.post('/meal-plan', apiController.upsertMealPlanDay);
router.post('/orders', apiController.createOrder);
router.get('/orders', apiController.getOrders);
router.patch('/orders/:id/day', apiController.setDeliveryDay);
router.patch('/orders/:id/payment', apiController.setPaymentDate);
router.patch('/orders/:id/payer', apiController.setPayerName);
router.post('/orders/:id/invoice', apiController.sendInvoice);
router.get('/users', apiController.getUsers);
router.patch('/users/:id/promote', apiController.promoteUser);

module.exports = router;
