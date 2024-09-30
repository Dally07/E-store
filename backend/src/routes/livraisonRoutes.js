const express = require('express');
const { authMiddleware, requireRole } = require('../middlewares/authMiddleware');
const livraisonController = require('../controllers/livraisonController');
const router = express.Router();

router.post('/',  livraisonController.createLivraison);
router.put('/:id', livraisonController.updateLivraison);
router.get('/:id', livraisonController.getLivraisonById);
router.get('/', livraisonController.getAllLivraisons);

module.exports = router;
