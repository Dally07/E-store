const { Sequelize, Op, where } = require('sequelize');
const Commande = require('../models/commande'); // Modèle Commande
const Client = require('../models/client');
const Produit = require('../models/produits');
const Paiement = require('../models/paiement');
const Commande_Produit = require('../models/commande_produit');
const ConfigurationPC = require('../models/config_pc');
const ConfigurationImprimante = require('../models/config_imprimante');
const ConfigurationTelephone = require('../models/config_telephone');
const ConfigurationAccessoire = require('../models/config_accessoire');

exports.getNombreVenteParJour = async (req, res) => {
    const { day } = req.query; // Récupérer les paramètres de mois et d'année
    console.log(day);
    if (!day) {
        return res.status(400).json({ message: 'Veuillez fournir une date valide (day).' });
    }

    try {
        // Créer une date de début et de fin pour le jour sélectionné
        const startDate = new Date(day);
        startDate.setHours(0 +3, 0, 0, 0); // Début de la journée
        const endDate = new Date(day);
        endDate.setHours(23 +3, 59, 59, 999); // Fin de la journée

        // Clause WHERE pour filtrer par date
        const whereClause = {
            createdAt: {
                [Op.between]: [startDate, endDate]
            }
        };

        // Calcul des statistiques
        const totalRevenue = await Commande.sum('total', { where: whereClause });
        const totalOrders = await Commande.count({ where: whereClause });
        const totalClient = await Client.count({include: [{model: Commande, as: 'commandes', where: whereClause}]}); // Si besoin du nombre total de clients

        // Retourner les statistiques
        res.status(200).json({ totalRevenue, totalOrders, totalClient });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des statistiques', error });
    }
};

exports.getProduitsVendusParJourParCategorie = async (req, res) => {
    const { day } = req.query; // Récupérer les paramètres de mois et d'année
    console.log(day);
    if (!day) {
        return res.status(400).json({ message: 'Veuillez fournir une date valide (day).' });
    }

    try {
        // Créer une date de début et de fin pour le jour sélectionné
        const startDate = new Date(day);
        startDate.setHours(0 +3, 0, 0, 0); // Début de la journée
        const endDate = new Date(day);
        endDate.setHours(23 +3, 59, 59, 999); // Fin de la journée

        // Clause WHERE pour filtrer par date
        const whereClause = {
            createdAt: {
                [Op.between]: [startDate, endDate]
            }
        };

        // Trouver les commandes à la date donnée et compter les produits par catégorie
        const result = await Commande.findAll({
            where: whereClause,
            include: [
                {
                    model: Produit,
                    as: 'produits',
                    attributes: ['categorie'],
                    through: { attributes: [] } // Exclure les attributs de la table de jointure
                }
            ]
        });

        // Compter les produits par catégorie
        const categorieCount = result.reduce((acc, commande) => {
            commande.produits.forEach((produit) => {
                if (!acc[produit.categorie]) {
                    acc[produit.categorie] = 0;
                }
                acc[produit.categorie] += 1;
            });
            return acc;
        }, {});

        res.status(200).json({ categorieCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des produits vendus par catégorie', error });
    }
};

exports.getModePaiement = async (req, res) => {
    const { day } = req.query; // Récupérer les paramètres de mois et d'année
    console.log(day);
    if (!day) {
        return res.status(400).json({ message: 'Veuillez fournir une date valide (day).' });
    }

    try {
        // Créer une date de début et de fin pour le jour sélectionné
        const startDate = new Date(day);
        startDate.setHours(0 +3, 0, 0, 0); // Début de la journée
        const endDate = new Date(day);
        endDate.setHours(23 +3, 59, 59, 999); // Fin de la journée

        // Clause WHERE pour filtrer par date
        const whereClause = {
            createdAt: {
                [Op.between]: [startDate, endDate]
            }
        };

        // Trouver les commandes à la date donnée et compter les produits par catégorie
        const result = await Commande.findAll({
            where: whereClause,
            include: [
                {
                    model: Paiement,
                    as: 'paiement',
                    attributes: ['methode'],
                    required: true// Exclure les attributs de la table de jointure
                }
            ]
        });

        // Compter les produits par catégorie
        const categorieCount = result.reduce((acc, commande) => {
            commande.paiement.forEach(paiement =>{
                const methode = paiement.methode;
                if (!acc[methode]) {
                    acc[methode] = 0;
                }
                acc[methode] += 1;           
            });
            return acc;           
        }, {});

        res.status(200).json({ categorieCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des produits vendus par catégorie', error });
    }
};

exports.afficherLeMeilleurClient = (req, res) => {
    const { day } = req.query; 
    console.log(day); 
    
    if (!day) {
        return res.status(400).json({ message: 'Veuillez fournir une date valide (day).' });
    }

    const startDate = new Date(day);
    startDate.setHours(0 +3, 0, 0, 0); // Début de la journée
    const endDate = new Date(day);
    endDate.setHours(23 +3, 59, 59, 999); // Fin de la journée

    Commande.findOne({
        attributes: [
            'client_id',
            [Sequelize.fn('SUM', Sequelize.col('total')), 'total_achats'], // Assurez-vous que 'total' existe
        ],
        include: [{
            model: Client,
            as: 'client', // Utilisez le même alias que dans l'association
            attributes: ['idCli', 'nomCli', 'emailCli'],
        }],
        where: {
            createdAt: {
                [Op.between]: [startDate, endDate]
            }
        },
        group: ['client_id', 'client.idCli', 'client.nomCli', 'client.emailCli'], // Assurez-vous d'inclure tous les attributs dans le groupe
        order: [[Sequelize.literal('total_achats'), 'DESC']],
        limit: 1
    })
    .then(result => {
        if (!result) {
            return res.status(404).json({ message: 'Aucun achat enregistré aujourd\'hui.' });
        }

        // Accéder au client depuis le résultat
        const client = result.client; // 'client' correspond à l'alias
        res.json({
            meilleur_client: {
                id: client.idCli,
                nom: client.nomCli,
                email: client.emailCli,
                total_achats: result.dataValues.total_achats // Accéder à total_achats ici
            }
        });
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération du meilleur client.' });
    });
};