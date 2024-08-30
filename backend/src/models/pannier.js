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
            key: 'idCli'
        },
        onDelete: 'CASCADE'
    }
});

module.exports = Panier;