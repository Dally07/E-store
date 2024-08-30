const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Panier = require('./pannier');
const Produit = require('./produits');

const Panier_Produit = sequelize.define('Panier_Produit', {
    idPanierProduit: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    panier_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Panier,
            key: 'idPanier'
        },
        onDelete: 'CASCADE'
    },
    produit_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Produit,
            key: 'idProduit'
        },
        onDelete: 'CASCADE'
    },
    quantite: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Panier_Produit;