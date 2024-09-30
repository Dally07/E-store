const express = require('express');
const router = express.Router();
const  {passerCommande}  = require('../controllers/commandeContoller');
const commandeController = require('../controllers/commandeContoller')
const { authMiddleware, requireRole } = require('../middlewares/authMiddleware');




//router.put('/:id/statut', authMiddleware, requireRole('Gestionnaire des commandes', 'Administrateur'), commandeController.getCommandeById);
//router.get('/',authMiddleware, commandeController.getAllCommande );
router.get('/:idCommande',  commandeController.getCommandeDetails);
router.get('/',  commandeController.getAllCommande);
router.post('/passer-commande',  passerCommande );
router.put('/:idCommande/annuler',  commandeController.cancelCommande);

module.exports = router;