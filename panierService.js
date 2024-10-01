const { sequelize } = require('../config/db'); // Assurez-vous que sequelize est bien importé
const Panier = require('../models/pannier');
const Panier_Produit = require('../models/Panier_Produit');
const Produit = require('../models/produits');

async function ajouterProduitDansPanier(clientId, produitId, quantite) {
    let transaction; // Déclarer la variable transaction ici
    try {
        console.log('Début de la transaction');
        console.log('Client ID:', clientId);
        console.log('Produit ID:', produitId);

        // Démarrer une transaction
        transaction = await sequelize.transaction(); 

        // 1. Vérifier si le panier existe pour le client
        let panier = await Panier.findOne({
            where: { client_id: clientId },
            transaction, 
            lock: true, 
        });

        if (!panier) {
            console.log('Pas de panier trouvé, création d\'un nouveau panier...');
            panier = await Panier.create({
                client_id: clientId,
                total: 0,
            }, { transaction });
        }

        // 2. Récupérer les informations du produit
        const produit = await Produit.findOne({
            where: { idProduit: produitId }, // Assurez-vous que 'idProduit' est correct
            transaction,
        });

        if (!produit) {
            throw new Error('Produit non trouvé');
        }

        // Vérifier si la quantité demandée est disponible
        if (produit.quantite_en_stock < quantite) {
            throw new Error('Quantité demandée non disponible');
        }

        const prixProduit = produit.prix;

        // 3. Ajouter le produit dans le panier
        const totalPrix = prixProduit * quantite;
        await Panier_Produit.create({
            panier_id: panier.idPanier,
            produit_id: produitId,
            quantite,
            prix: totalPrix,
        }, { transaction });

        // 4. Mettre à jour le total du panier
        panier.total += totalPrix;
        await panier.save({ transaction });

        // 5. Décrémenter la quantité en stock du produit
        produit.quantite_en_stock -= quantite;
        await produit.save({ transaction });

        // Confirmer la transaction
        await transaction.commit();
        console.log('Produit ajouté au panier avec succès');

        // Afficher les produits dans le panier après l'ajout
        const produitsDansPanier = await afficherProduitsDansPanier(panier.idPanier);
        console.log('Produits dans le panier :', produitsDansPanier);

        return { message: 'Produit ajouté au panier avec succès', produits: produitsDansPanier };

    } catch (error) {
        if (transaction) await transaction.rollback(); 
        console.error('Erreur lors de l\'ajout au panier :', error.message);
        throw new Error('Erreur lors de l\'ajout au panier : ' + error.message);
    }
}

// Nouvelle fonction pour afficher les produits dans le panier
async function afficherProduitsDansPanier(panierId) {
    try {
        const panier = await Panier.findOne({
            where: { idPanier: panierId },
            include: [
                {
                    model: Panier_Produit,
                    as: 'produits', // Doit correspondre à l'alias dans l'association
                    include: [
                        {
                            model: Produit,
                            as: 'produit', // Ici, utilisez l'alias correct
                        },
                    ],
                },
            ],
        });

        if (!panier) {
            throw new Error('Aucun panier trouvé');
        }

        // Retourner les produits du panier
        return panier.produits.map(panierProduit => {
            return {
                idProduit: panierProduit.produit.idProduit,
                nomProduit: panierProduit.produit.nom,
                quantite: panierProduit.quantite,
                prixUnitaire: panierProduit.produit.prix,
                totalPrix: panierProduit.quantite * panierProduit.produit.prix,
            };
        });

    } catch (error) {
        console.error('Erreur lors de la récupération du panier :', error.message);
        throw new Error('Erreur lors de la récupération du panier : ' + error.message);
    }
}

// Fonction pour supprimer un produit du panier
async function supprimerProduitDuPanier(clientId, produitId, quantite) {
    let transaction; // Déclarer la variable transaction ici
    try {
        console.log('Début de la transaction pour la suppression du produit');
        
        // Démarrer une transaction
        transaction = await sequelize.transaction();

        // 1. Vérifier si le panier existe pour le client
        const panier = await Panier.findOne({
            where: { client_id: clientId },
            transaction,
        });

        if (!panier) {
            throw new Error('Aucun panier trouvé pour ce client.');
        }

        // 2. Vérifier si le produit est dans le panier
        const panierProduit = await Panier_Produit.findOne({
            where: {
                panier_id: panier.idPanier,
                produit_id: produitId,
            },
            transaction,
        });

        if (!panierProduit) {
            throw new Error('Produit non trouvé dans le panier.');
        }

        // 3. Si une quantité est spécifiée, la décrémenter
        if (quantite) {
            if (panierProduit.quantite < quantite) {
                throw new Error('Quantité à supprimer supérieure à celle dans le panier.');
            }

            // Mettre à jour le total du panier
            const totalADecrementer = panierProduit.prix / panierProduit.quantite * quantite;
            panier.total -= totalADecrementer;
            await panier.save({ transaction });

            // Décrémenter la quantité dans Panier_Produit
            panierProduit.quantite -= quantite;
            await panierProduit.save({ transaction });

            // Supprimer l'entrée si la quantité devient 0
            if (panierProduit.quantite === 0) {
                await panierProduit.destroy({ transaction });
            }
        } else {
            // Si aucune quantité n'est spécifiée, supprimer entièrement le produit
            await panierProduit.destroy({ transaction });
            panier.total -= panierProduit.prix; // Suppression du prix total du produit
            await panier.save({ transaction });
        }

        // Confirmer la transaction
        await transaction.commit();
        console.log('Produit supprimé du panier avec succès');
        return { message: 'Produit supprimé du panier avec succès' };

    } catch (error) {
        if (transaction) await transaction.rollback();
        console.error('Erreur lors de la suppression du produit du panier :', error.message);
        throw new Error('Erreur lors de la suppression du produit : ' + error.message);
    }
}


module.exports = { ajouterProduitDansPanier, afficherProduitsDansPanier, supprimerProduitDuPanier};
