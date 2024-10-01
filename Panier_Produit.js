const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Panier = require('./pannier'); // Assurez-vous que le nom du fichier est correct
const Produit = require('./produits'); // Assurez-vous que le nom du fichier est correct

const Panier_Produit = sequelize.define('Panier_Produit', {
    idPanierProduit: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    panier_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Panier,
            key: 'idPanier' // Assurez-vous que 'idPanier' est le bon nom de clé primaire
        },
        onDelete: 'CASCADE'
    },
    produit_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Produit,
            key: 'idProduit' // Assurez-vous que 'idProduit' est le bon nom de clé primaire
        },
        onDelete: 'CASCADE'
    },
    quantite: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: true
    }
});
Panier_Produit.belongsTo(Panier, {
    foreignKey: 'panier_id',
    as: 'panier' // Cet alias peut être utilisé dans d'autres requêtes si besoin
});

module.exports = Panier_Produit;