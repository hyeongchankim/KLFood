const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.post('/b2b-inquiry', apiController.handleB2BInquiry);
router.get('/cham-products', apiController.getChamProducts);
router.post('/auth/register', apiController.registerUser);
router.post('/auth/login', apiController.loginUser);
router.get('/meal-plan', apiController.getMealPlan);
router.post('/meal-plan', apiController.upsertMealPlanDay);

module.exports = router;
