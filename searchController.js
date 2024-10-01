const { Op } = require('sequelize'); 
const Produit = require('../models/produits');
const Config_Pc = require('../models/config_pc');
const Config_Telephone = require('../models/config_telephone');
const Config_Imprimante = require('../models/config_imprimante');
const Config_Accessoire = require('../models/config_accessoire');
const Client = require('../models/client');
const Commande = require('../models/commande');

// Fonction pour la recherche globale
const rechercher = async (req, res) => {
    const query = req.query.query; // Texte recherché
    const isNumeric = !isNaN(query);  // Vérifier si la requête est un nombre

    try {
        // Rechercher produits par nom, description, ou référence
        const produits = await Produit.findAll({
            where: {
                [Op.or]: [
                    { nom: { [Op.iLike]: `%${query}%` } },
                    { description: { [Op.iLike]: `%${query}%` } },
                    { reference: { [Op.iLike]: `%${query}%` } }
                ]
            },
            include: [
                { model: Config_Pc, as: 'configPC' },
                { model: Config_Telephone, as: 'configTelephone' },
                { model: Config_Imprimante, as: 'configImprimante' },
                { model: Config_Accessoire, as: 'configAccessoire' }
            ]
        });

        // Rechercher produits par configuration seulement si aucun produit n'a été trouvé dans 'produits'
        let produitsParConfig = [];
        if (produits.length === 0) {
            produitsParConfig = await Produit.findAll({
                include: [
                    { 
                        model: Config_Pc, as: 'configPC',
                        where: {
                            [Op.or]: [
                                { marque: { [Op.iLike]: `%${query}%` } },
                                { ram: { [Op.iLike]: `%${query}%` } },
                                { carte_graphique: { [Op.iLike]: `%${query}%` } }
                            ]
                        },
                        required: true
                    },
                    { 
                        model: Config_Telephone, as: 'configTelephone',
                        where: {
                            [Op.or]: [
                                { marque: { [Op.iLike]: `%{query}%` } },
                                { ram: { [Op.iLike]: `%{query}%` } },
                                { processeur: { [Op.iLike]: `%{query}%` } }
                            ]
                        },
                        required: true
                    },
                    { 
                        model: Config_Imprimante, as: 'configImprimante',
                        where: {
                            [Op.or]: [
                                { marque: { [Op.iLike]: `%{query}%` } },
                                { type_d_impression: { [Op.iLike]: `%{query}%` } },
                                { resolution: { [Op.iLike]: `%{query}%` } }
                            ]
                        },
                        required: true
                    },
                    { 
                        model: Config_Accessoire, as: 'configAccessoire',
                        where: {
                            [Op.or]: [
                                { compatibilite: { [Op.iLike]: `%{query}%` } },
                                { marque: { [Op.iLike]: `%{query}%` } }
                            ]
                        },
                        required: true
                    }
                ]
            });
        }

        // Rechercher clients par nom, adresse, ou email
        const clients = await Client.findAll({
            where: {
                [Op.or]: [
                    { nomCli: { [Op.iLike]: `%${query}%` } },
                    { adresseCli: { [Op.iLike]: `%${query}%` } },
                    { emailCli: { [Op.iLike]: `%${query}%` } }
                ]
            }
        });

        // Rechercher commandes par ID ou par statut
        const commandes = await Commande.findAll({
            where: {
                [Op.or]: [
                    isNumeric ? { idCommande: query } : null,  // Recherche par ID uniquement si c'est un nombre
                ].filter(Boolean)  // Filtrer les conditions nulles
            },
            include: [
                { model: Client, as: 'client' },
                { model: Produit, as: 'produits', through: { attributes: ['quantite', 'prix'] } }
            ]
        });

        // Retourner les résultats, en ne renvoyant 'produitsParConfig' que si 'produits' est vide
        return res.json({
            produits: produits.length > 0 ? produits : produitsParConfig,
            clients,
            commandes
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erreur lors de la recherche.' });
    }
};

module.exports = { rechercher };
