const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { authMiddleware } = require('../middlewares/authMiddleware'); // Assure-toi d'avoir un middleware d'authentification si nécessaire

// Route pour marquer une notification comme "Vu"
router.put('/:idNotification/marquer-vu', authMiddleware, notificationController.marquerCommeVu);

module.exports = router;