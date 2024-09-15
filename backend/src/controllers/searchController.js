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
                    { nom: { [Op.like]: `%${query}%` } },
                    { description: { [Op.like]: `%${query}%` } },
                    { reference: { [Op.like]: `%${query}%` } }
                ]
            },
            include: [
                { model: Config_Pc, as: 'configPC' },
                { model: Config_Telephone, as: 'configTelephone' },
                { model: Config_Imprimante, as: 'configImprimante' },
                { model: Config_Accessoire, as: 'configAccessoire' }
            ]
        });

        // Rechercher produits par configuration
        const produitsParConfig = await Produit.findAll({
            include: [
                { 
                    model: Config_Pc, as: 'configPC',
                    where: {
                        [Op.or]: [
                            { marque: { [Op.like]: `%${query}%` } },
                            { ram: { [Op.like]: `%${query}%` } },
                            { carte_graphique: { [Op.like]: `%${query}%` } }
                        ]
                    },
                    required: false
                },
                { 
                    model: Config_Telephone, as: 'configTelephone',
                    where: {
                        [Op.or]: [
                            { marque: { [Op.like]: `%${query}%` } },
                            { ram: { [Op.like]: `%${query}%` } },
                            { processeur: { [Op.like]: `%${query}%` } }
                        ]
                    },
                    required: false
                },
                { 
                    model: Config_Imprimante, as: 'configImprimante',
                    where: {
                        [Op.or]: [
                            { marque: { [Op.like]: `%${query}%` } },
                            { type_d_impression: { [Op.like]: `%${query}%` } },
                            { resolution: { [Op.like]: `%${query}%` } }
                        ]
                    },
                    required: false
                },
                { 
                    model: Config_Accessoire, as: 'configAccessoire',
                    where: {
                        [Op.or]: [
                            { compatibilite: { [Op.like]: `%${query}%` } },
                            { marque: { [Op.like]: `%${query}%` } }
                        ]
                    },
                    required: false
                }
            ]
        });

        // Rechercher clients par nom, adresse, ou email
        const clients = await Client.findAll({
            where: {
                [Op.or]: [
                    { nomCli: { [Op.like]: `%${query}%` } },
                    { adresseCli: { [Op.like]: `%${query}%` } },
                    { emailCli: { [Op.like]: `%${query}%` } }
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
                { model: Produit,as: 'produits', through: { attributes: ['quantite', 'prix'] } }
            ]
        });

        return res.json({
            produits,
            produitsParConfig,
            clients,
            commandes
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erreur lors de la recherche.' });
    }
};

module.exports = { rechercher };
