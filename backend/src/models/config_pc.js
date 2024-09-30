const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Produit = require('./produits');

const Config_Pc = sequelize.define('Config_Pc', {
    idConfigPc: {
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
    carte_graphique: {
        type: DataTypes.STRING(100)
    },
    processeur: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    ram: {
        type: DataTypes.STRING(50)
    },
    rom: {
        type: DataTypes.STRING(50)
    },
    ecran: {
        type: DataTypes.STRING(50)
    },
    marque: {
        type: DataTypes.STRING(100)
    },
    tactile: {
        type: DataTypes.BOOLEAN
    },
    clavier_rgb: {
        type: DataTypes.BOOLEAN
    }
},
{
    timestamps: true
});

module.exports = Config_Pc;