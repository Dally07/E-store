const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const router = express.Router();

router.get('/stats', dashboardController.getStat)
router.get('/sales/monthlty', dashboardController.getSalesStatsBuMonth);
router.get('/visitor/daily', dashboardController.getVisitorByDay);

module.exports = router;