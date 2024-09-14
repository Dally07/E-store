const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Client = require('./client');
const Produit = require('./produits');


const Commande = sequelize.define('Commande', {
    idCommande: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    client_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Client,
            key: 'idCli'
        },
        onDelete: 'CASCADE'
    },
    date_commande: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    statut: {
        type: DataTypes.ENUM('En cours', 'Expédiée', 'Livrée', 'Annulée', 'En livraison'),
        defaultValue: 'En cours'
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
});





module.exports = Commande;