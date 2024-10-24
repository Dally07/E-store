const { Sequelize, Op } = require('sequelize');
const Commande = require('../models/commande');
const Utilisateur = require('../models/utilisateur');
const Client = require('../models/client');
const Produit = require('../models/produits');
const ConfigurationPC = require('../models/config_pc');
const ConfigurationImprimante = require('../models/config_imprimante');
const ConfigurationTelephone = require('../models/config_telephone');
const ConfigurationAccessoire = require('../models/config_accessoire');
const { sequelize } = require('../config/db');


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
    const { month, year} = req.query;
    try {
        const startDate = new Date(year, month, 1)
        const endDate = new Date(year, parseInt(month) + 1, 0)
        const salesByDay = await Commande.findAll({
            attributes: [
                [Sequelize.fn('DATE_TRUNC', 'day', Sequelize.col('createdAt')), 'jour'],
                [Sequelize.fn('SUM', Sequelize.col('total')), 'totalVente']
            ],
            where: {
                createdAt: {
                    [Op.between]: [startDate, endDate]
                }
                    
            },
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
    const { month, year} = req.query;
    try {
        const startDate = new Date(year, month, 1)
        const endDate = new Date(year, parseInt(month) + 1, 0)
        const VisitorByDay = await Client.findAll({
            attributes: [
                [Sequelize.fn('DATE_TRUNC', 'day', Sequelize.col('createdAt')), 'jour'],
                [Sequelize.fn('COUNT', Sequelize.col('idCli')), 'totalVisiteurs']
            ],
            where: {
                createdAt: {
                    [Op.between]: [startDate, endDate]
                }
                    
            },
            group:['jour'],
            order: [['jour', 'ASC']]
        });

        res.status(200).json(VisitorByDay);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la recuperation des clients par jours', error});
    }
};

// FONCTION POUR LES 10 DERNIER COMMANDE
exports.getRecentOrders = async (req, res) => {
    try {
        const recentOrders = await Commande.findAll({
            order: [['date_commande', 'DESC']],
            limit: 5,
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

// FONCTION STATISTIQUE DES PRODUITS
exports.getProductCategory = async (req, res) => {
    try {
        // Compter le nombre total de produits de type PC
        const pcTotal = await Produit.count({
            include: [{
                model: ConfigurationPC, as: 'configPC',
                where: { idConfigPc: { [Op.ne]: null } }, // Inclure uniquement les produits avec configuration PC
                required: true
            }]
        });

        // Compter le nombre total de produits de type Téléphone
        const telephoneTotal = await Produit.count({
            include: [{
                model: ConfigurationTelephone, as: 'configTelephone',
                where: { idConfigTel: { [Op.ne]: null } }, // Inclure uniquement les produits avec configuration Téléphone
                required: true
            }]
        });

        // Compter le nombre total de produits de type Imprimante
        const imprimanteTotal = await Produit.count({
            include: [{
                model: ConfigurationImprimante, as: 'configImprimante',
                where: { idConfigImprimante: { [Op.ne]: null } }, // Inclure uniquement les produits avec configuration Imprimante
                required: true
            }]
        });

        // Compter le nombre total de produits de type Accessoire
        const accessoireTotal = await Produit.count({
            include: [{
                model: ConfigurationAccessoire, as: 'configAccessoire',
                where: { idConfigAccessoire: { [Op.ne]: null } }, // Inclure uniquement les produits avec configuration Accessoire
                required: true
            }]
        });

        // Retourner les résultats sous forme de totaux par catégorie
        res.status(200).json({
            pc: pcTotal,
            telephone: telephoneTotal,
            imprimante: imprimanteTotal,
            accessoire: accessoireTotal
        });
    } catch (error) {
        console.error('Erreur lors du calcul des totaux des produits par configuration:', error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};


// FONCTION POUR AFFICHER LES 10 PRODUITS EN CRITIQUE
exports.getLowStockProducts = async (req, res) => {
    try {
        // Requête pour trouver tous les produits avec une quantité en stock inférieure ou égale à 10
        const lowStockProducts = await Produit.findAll({
            where: {
                quantite_en_stock: {
                    [Op.lte]: 10 // Opérateur Sequelize pour "moins que ou égal"
                }
            }
        });

        // Vérification s'il y a des produits trouvés
        if (lowStockProducts.length === 0) {
            return res.status(200).json({ message: 'Tous les produits sont en stock suffisant.' });
        }

        // Retourner la liste des produits en stock faible
        res.status(200).json(lowStockProducts);
    } catch (error) {
        console.error('Erreur lors de la récupération des produits en stock critique:', error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};

exports.topClients = async (req, res) => {
    try {
      const topClients = await sequelize.query(
        `SELECT "Client"."nomCli","Client"."telCli","Client"."emailCli", "Client"."adresseCli", SUM("commandes"."total") AS "totalCommandes" 
FROM "Clients" AS "Client"
LEFT JOIN "Commandes" AS "commandes" ON "Client"."idCli" = "commandes"."client_id"
GROUP BY "Client"."idCli"
ORDER BY "totalCommandes" DESC
LIMIT 5;`,
        {
          type: sequelize.QueryTypes.SELECT
        }
      );
  
      return res.status(200).json(topClients); // Renvoie les résultats en tant que réponse JSON
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur lors de la récupération des clients.' });
    }
  };
  




