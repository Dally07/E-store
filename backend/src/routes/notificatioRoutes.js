const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');
const notificationController = require('../controllers/notificationController');
const { authMiddleware, requireRole } = require('../middlewares/authMiddleware');

// Récupérer les notifications pour un utilisateur
router.get('/notifications', authMiddleware, notificationController.getAllNotifications);
router.get('/notifications/:idNotification', authMiddleware, notificationController.getNotificationById);
router.put('/notifications/:idNotification/vue',authMiddleware, notificationController.marquerCommeVu);

module.exports = router;
