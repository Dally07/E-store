const express = require('express');
const router = express.Router();
const paiementController = require('../controllers/paiementController');
const { authMiddleware, requireRole } = require('../middlewares/authMiddleware');

router.post('/process', authMiddleware, paiementController.processPaiement);
router.put('/update-statut/:idPaiement', authMiddleware, paiementController.updatePaiementStatut);
router.get('/:idPaiement', paiementController.getPaiementDetails);
router.get('/', paiementController.getAllPaiements);

module.exports = router;