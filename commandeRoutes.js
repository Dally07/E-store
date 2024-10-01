const express = require('express');
const router = express.Router();
const  commandeController  = require('../controllers/commandeContoller');
const { authMiddleware, requireRole } = require('../middlewares/authMiddleware');




router.put('/:id/statut', authMiddleware, requireRole('Gestionnaire des commandes', 'Administrateur'), commandeController.updateStatutCommande);

module.exports = router;