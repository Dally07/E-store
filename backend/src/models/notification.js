const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Utilisateur = require('./utilisateur');

const Notification = sequelize.define('Notification', {
    idNotification: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    utilisateur_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Utilisateur,
            key: 'idUtilisateur'
        },
        onDelete: 'CASCADE'
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    vue: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    date_notification: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = Notification;