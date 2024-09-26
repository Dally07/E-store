const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');


const Produit = sequelize.define('Produit', {
    idProduit: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    prix: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    quantite_en_stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    categorie: {
        type: DataTypes.ENUM('PC', 'Telephone', 'Imprimante', 'Accessoire'),
        allowNull: false
    },
    couleurs_disponibles: {
        type: DataTypes.ARRAY(DataTypes.STRING(50))
    },
    processeur: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    reference: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    statutStock: {
        type: DataTypes.ENUM('Disponible', 'Rupture de stock', 'Stock critique'),
        defaultValue: 'Disponible'
    },
    photo1 : {
        type : DataTypes.STRING,
        allowNull: false,
    },
    photo2 : {
        type : DataTypes.STRING,
        allowNull: true
    },
    photo3 : {
        type : DataTypes.STRING,
        allowNull: true
    }
    
},
{
    timestamps: true
});




module.exports = Produit;