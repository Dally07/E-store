const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Client = sequelize.define('Client', {
    idCli: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nomCli: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    telCli: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    emailCli: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
    },
    mdpCli: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    adresseCli: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

module.exports = Client;