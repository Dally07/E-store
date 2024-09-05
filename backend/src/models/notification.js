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
        allowNull: false,
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
    
    statut: {
        type: DataTypes.ENUM('Vu', 'non lu'),
        defaultValue: 'non lu'
    }

},
{
    timestamps: true,
});

module.exports = Notification;