const express = require('express');
const router = express.Router();
const panierController = require('../controllers/panierController');

// Ajouter un produit au panier
router.post('/ajouter', panierController.ajouterProduitAuPanier);

// Récupérer les produits dans le panier d'un client
router.get('/client/:client_id', panierController.afficherPanierClient); // Changez la route ici
// Supprimer un produit du panier
router.delete('/supprimer', panierController.supprimerProduitDuPanier);

module.exports = router;
