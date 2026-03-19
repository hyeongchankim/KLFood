const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.post('/b2b-inquiry', apiController.handleB2BInquiry);
router.get('/cham-products', apiController.getChamProducts);

module.exports = router;
