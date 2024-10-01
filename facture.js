const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Commande = require('./commande');

const Facture = sequelize.define('Facture', {
    idFacture: {
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
    numero_facture: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false
    },
    date_facture: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    details: {
        type: DataTypes.TEXT
    }
});

module.exports = Facture;