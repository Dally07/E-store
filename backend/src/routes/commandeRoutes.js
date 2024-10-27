const express = require('express');
const router = express.Router();
const  {passerCommande}  = require('../controllers/commandeContoller');
const commandeController = require('../controllers/commandeContoller')
const { authMiddleware, requireRole } = require('../middlewares/authMiddleware');


module.exports = (io) =>  {
//router.put('/:id/statut', authMiddleware, requireRole('Gestionnaire des commandes', 'Administrateur'), commandeController.getCommandeById);
//router.get('/',authMiddleware, commandeController.getAllCommande );
router.get('/:idCommande',  commandeController.getCommandeDetails);
router.get('/',  commandeController.getAllCommande);
router.post('/passer-commande', authMiddleware, (req, res) =>  passerCommande(req, res, io) );
router.put('/:idCommande/annuler', authMiddleware,requireRole('Gestionnaire des commandes', 'Administrateur'), (req, res) =>  commandeController.cancelCommande(req, res, io));

    return router;
}