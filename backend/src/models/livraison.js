const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Commande = require('./commande');
const Client = require('./client');

const Livraison = sequelize.define('Livraison', {
    idLivraison: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    commande_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Commande,
            key: 'idCommande'
        },
        onDelete: 'CASCADE'
    },
    client_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Client,
            key: 'idCli'
        }
    },
    nom_livreur: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vehicule: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numero_vehicule: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telephone_livreur: {
        type: DataTypes.STRING,
        allowNull: false
    },
    adresse_livraison: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    heure_depart: {
        type: DataTypes.DATE,
        allowNull: true
    },
    heure_arrivee: {
        type: DataTypes.DATE,
        allowNull: true
    }
});




module.exports = Livraison;