// routes/clientRoutes.js
const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// Routes pour l'inscription et la connexion
router.post('/register', clientController.register);
router.post('/login', clientController.login);

module.exports = router;
