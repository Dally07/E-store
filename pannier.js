const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Client = require('./client');

const Panier = sequelize.define('Panier', {
    idPanier: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    client_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Client,
            key: 'idCli' // Assurez-vous que 'idCli' est le bon nom de clé primaire
        },
        onDelete: 'CASCADE'
    }
}, {
    timestamps: false
});

module.exports = Panier;