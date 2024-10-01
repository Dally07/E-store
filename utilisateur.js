const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Utilisateur = sequelize.define('Utilisateur', {
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
        type: DataTypes.ENUM('Administrateur','Gestionnaire des produits', 'Gestionnaire des commandes', 'Livreur'),
        allowNull: false
    },
    adresse: {
        type: DataTypes.STRING,
        allowNull:false
    },
    photo : {
        type : DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true
});

module.exports = Utilisateur;