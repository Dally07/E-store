const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Produit = require('./produits');

const Config_Accessoire = sequelize.define('Config_Accessoire', {
    idConfigAccessoire: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    produit_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Produit,
            key: 'idProduit'
        },
        onDelete: 'CASCADE'
    },
    marque: {
        type: DataTypes.STRING(100)
    },
    type_accessoire: {
        type: DataTypes.STRING(100)
    },
    compatibilite: {
        type: DataTypes.STRING(255)
    }
});

module.exports = Config_Accessoire;