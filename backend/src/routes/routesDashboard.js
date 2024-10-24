const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/stats', authMiddleware, dashboardController.getStat)
router.get('/sales/monthlty', authMiddleware, dashboardController.getSalesStatsByDay);
router.get('/visitor/daily',authMiddleware, dashboardController.getVisitorByDay);
router.get('/orders/recent',authMiddleware, dashboardController.getRecentOrders);
router.get('/orders/total',authMiddleware, dashboardController.getProductCategory);
router.get('/orders/low',authMiddleware, dashboardController.getLowStockProducts);
router.get('/orders/top',authMiddleware, dashboardController.topClients);

module.exports = router;