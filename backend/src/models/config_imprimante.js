const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Produit = require('./produits');

const Config_Imprimante = sequelize.define('Config_Imprimante', {
    idConfigImprimante: {
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
    type_d_impression: {
        type: DataTypes.STRING(50)
    },
    resolution: {
        type: DataTypes.STRING(50)
    },
    vitesse_impression: {
        type: DataTypes.STRING(50)
    }
},
{
    timestamps: true
});

module.exports = Config_Imprimante;