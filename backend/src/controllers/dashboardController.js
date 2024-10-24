const { Sequelize } = require('sequelize');
const Commande = require('../models/commande');
const Utilisateur = require('../models/utilisateur');
const Client = require('../models/client');
const Produit = require('../models/produits');


// FONCTION STATISTIQUE GENERALE
exports.getStat = async (req, res) => {
    try {
        const totalRevenue = await Commande.sum('total');
        const totalOrders = await Commande.count();
        const totalClient = await Client.count();
        const totalVisitor = await Utilisateur.count();

        res.status(200).json({totalRevenue, totalOrders, totalClient, totalVisitor});
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la recuperation des statistique', error});
    }
};

// FONCTION  STATISTIQUE DE VENTE PAR MOIS
exports.getSalesStatsByDay = async (req, res) => {
    try {
        const salesByDay = await Commande.findAll({
            attributes: [
                [Sequelize.fn('DATE_TRUNC', 'day', Sequelize.col('createdAt')), 'jour'],
                [Sequelize.fn('SUM', Sequelize.col('total')), 'totalVente']
            ],
            group:['jour'],
            order: [['jour', 'ASC']]
        });

        res.status(200).json(salesByDay);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la recuperation des ventes mensuelles', error});
    }
};


// FONCTION STATISTIQUE DE CLIENT PAR mois
exports.getVisitorByDay = async (req, res) => {
    try {
        const VisitorByDay = await Client.findAll({
            attributes: [
                [Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('createdAt')), 'mois'],
                [Sequelize.fn('COUNT', Sequelize.col('idCli')), 'totalVisiteurs']
            ],
            group:['mois'],
            order: [['mois', 'ASC']]
        });

        res.status(200).json(VisitorByDay);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la recuperation des visites par jours', error});
    }
};

exports.getRecentOrders = async (req, res) => {
    try {
        const recentOrders = await Commande.findAll({
            order: [['date_commande', 'DESC']],
            limit: 10,
            include: [
                {
                    model: Client,
                    as: 'client',
                    attributes: ['nomCli', 'emailCli']
                },
                {
                    model: Produit,
                    as: 'produits',
                    through: { attributes: ['quantite', 'prix'] }
                }
            ]
        });
        res.status(200).json(recentOrders);

    }catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la recuperation de la commande recente'})
    }
   
}

