// controllers/rapportController.js
const { Op, Sequelize } = require('sequelize');
const Commande = require('../models/commande');
const Produit = require('../models/produits');
const Paiement = require('../models/paiement');
const Client = require('../models/client');

exports.getRapportJournalier = async (req, res) => {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        // Revenu total pour la journée
        const totalRevenue = await Paiement.sum('montant', {
            where: {
                date_paiement: {
                    [Op.between]: [startOfDay, endOfDay]
                }
            }
        });

        // Nombre de commandes
        const totalOrders = await Commande.count({
            where: {
                date_commande: {
                    [Op.between]: [startOfDay, endOfDay]
                }
            }
        });

        // Répartition des produits vendus
        const productsSold = await Produit.findAll({
            attributes: [
                'nom',
                [Sequelize.fn('COUNT', Sequelize.col('commandes.Commande_Produit.idCommandeProduit')), 'totalVendus']
            ],
            include: [{
                model: Commande,
                as: 'commandes',
                required: true,
                attributes: [], // Ne pas sélectionner de colonnes de Commande
                through: {
                    model: Commande.Produit, // Utiliser le modèle de la table de jointure si nécessaire
                    attributes: [] // Ne pas sélectionner de colonnes de la jointure
                },
                where: {
                    date_commande: {
                        [Op.between]: [startOfDay, endOfDay]
                    }
                }
            }],
            group: ['Produit.idProduit', 'Produit.nom']
        });

        // Valeur moyenne des commandes
        const averageOrderValue = totalRevenue / totalOrders || 0;

        // Méthode de paiement
        const paymentMethods = await Paiement.findAll({
            attributes: ['methode', [Sequelize.fn('COUNT', Sequelize.col('methode')), 'count']],
            where: {
                date_paiement: {
                    [Op.between]: [startOfDay, endOfDay]
                }
            },
            group: ['methode']
        });

        // Retourner les résultats
        res.status(200).json({
            totalRevenue,
            totalOrders,
            productsSold,
            averageOrderValue,
            paymentMethods
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération du rapport journalier.', error });
    }
};
