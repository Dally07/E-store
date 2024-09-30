const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// Route pour créer un client
router.post('/register', clientController.register);

// Route pour récupérer tous les clients
router.get('/', clientController.getAllClient);

module.exports = router;
