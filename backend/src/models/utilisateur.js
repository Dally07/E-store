const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Utilisateur = sequelize.define('User', {
    idUtilisateur: {
        type : DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    mot_de_passe: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('Administrateur','Gestionnaire des produits', 'Gestionnaire des commandes'),
        defaultValue: 'Gestionnaire des produits',
        allowNull: false
    },
    adresse: {
        type: DataTypes.STRING,
        allowNull:false
    }
});

module.exports = Utilisateur;