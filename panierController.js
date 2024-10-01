const panierService = require('../services/panierService');
const Panier_Produit = require('../models/Panier_Produit'); // Assurez-vous de ne pas avoir de déclaration répétée
const Panier = require('../models/pannier');
const Produit = require('../models/produits');

// Fonction pour ajouter un produit au panier
const ajouterProduitAuPanier = async (req, res) => {
    const { clientId, produitId, quantite } = req.body;
    try {
        const result = await panierService.ajouterProduitDansPanier(clientId, produitId, quantite);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Fonction pour afficher les produits dans un panier
const afficherPanierClient = async (req, res) => {
    const clientId = req.params.client_id;

    try {
        const panierTrouve = await Panier.findOne({
            where: { client_id: clientId },
            include: [
                {
                    model: Panier_Produit,
                    as: 'produits', // Assurez-vous que l'alias correspond à votre association
                    include: [
                        {
                            model: Produit,
                            as: 'produit', // Assurez-vous que l'alias correspond à votre association
                        },
                    ],
                },
            ],
        });

        if (!panierTrouve) {
            return res.status(404).json({ message: 'Aucun panier trouvé pour ce client.' });
        }

        // Formater la réponse
        const produitsDansPanier = panierTrouve.produits.map(panierProduit => {
            return {
                idProduit: panierProduit.produit.idProduit,
                nomProduit: panierProduit.produit.nom,
                quantite: panierProduit.quantite,
                prixUnitaire: panierProduit.produit.prix,
                totalPrix: panierProduit.quantite * panierProduit.produit.prix,
            };
        });

        return res.status(200).json({
            clientId: clientId,
            total: panierTrouve.total,
            produits: produitsDansPanier,
        });

    } catch (error) {
        console.error('Erreur lors de la récupération du panier :', error.message);
        return res.status(500).json({ message: 'Erreur lors de la récupération du panier.' });
    }
};

// Fonction pour supprimer un produit du panier
const supprimerProduitDuPanier = async (req, res) => {
    const { clientId, produitId, quantite } = req.body; // Vous pouvez spécifier la quantité à supprimer

    try {
        const result = await panierService.supprimerProduitDuPanier(clientId, produitId, quantite);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { ajouterProduitAuPanier, afficherPanierClient,supprimerProduitDuPanier};
