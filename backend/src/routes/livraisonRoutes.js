const express = require('express');
const { authMiddleware, requireRole } = require('../middlewares/authMiddleware');
const livraisonController = require('../controllers/livraisonController');
const router = express.Router();

router.post('/', authMiddleware, requireRole('Administrateur', 'Livreur'), livraisonController.createLivraison);
router.put(':id', authMiddleware, requireRole('Administrateur', 'Livreur'), livraisonController.updateLivraison);

module.exports = router;
