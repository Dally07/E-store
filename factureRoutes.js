const express = require('express');
const router = express.Router();
const factureController = require('../controllers/factureController');
const { authMiddleware, requireRole } = require('../middlewares/authMiddleware');


router.post('/:commande_id/envoyer', authMiddleware, requireRole('Administrateur', 'Gestionnaire des commandes'), factureController.envoyerFacture);

module.exports = router;