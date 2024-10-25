// routes/rapportRoutes.js
const express = require('express');
const { authMiddleware, requireRole } = require('../middlewares/authMiddleware');
const rapportController = require('../controllers/rapportController');
const router = express.Router();

// Route pour récupérer le rapport journalier
router.get('/rapport-journalier', authMiddleware, rapportController.getNombreVenteParJour);
router.get('/rapport-journalier/statProd', authMiddleware, rapportController.getProduitsVendusParJourParCategorie);
router.get('/rapport-journalier/paiement', authMiddleware, rapportController.getModePaiement);
router.get('/rapport-journalier/topPoduct', authMiddleware, rapportController.afficherLeMeilleurClient);

module.exports = router;
