const express = require('express');
const { getOrders, createOrder, updateOrderStatus, deleteOrder } = require('../controllers/orderController');
const router = express.Router();

router.get('/', getOrders);
router.post('/', createOrder);
router.put('/:id/status', updateOrderStatus);
router.delete('/:id', deleteOrder);

module.exports = router;
