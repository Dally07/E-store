const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const { authMiddleware, requireRole } = require('../middlewares/authMiddleware');

// Route pour créer un client
router.post('/register',authMiddleware,requireRole('Administrateur'), clientController.register);

// Route pour récupérer tous les clients
router.get('/',authMiddleware, clientController.getAllClient);

module.exports = router;
