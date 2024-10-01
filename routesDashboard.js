const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/stats', authMiddleware, dashboardController.getStat)
router.get('/sales/monthlty', authMiddleware, dashboardController.getSalesStatsBuMonth);
router.get('/visitor/daily',authMiddleware, dashboardController.getVisitorByDay);
router.get('/orders/recent',authMiddleware, dashboardController.getRecentOrders);

module.exports = router;