const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Produit = require('./produits');

const Config_Telephone = sequelize.define('Config_Telephone', {
    idConfigTel: {
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
    ram: {
        type: DataTypes.STRING(50)
    },
    rom: {
        type: DataTypes.STRING(50)
    },
    processeur: {
        type: DataTypes.STRING(100)
    }
},
{
    timestamps: true
});

module.exports = Config_Telephone;