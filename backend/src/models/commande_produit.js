const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Commande = require('./commande');
const Produit = require('./produits');

const Commande_Produit = sequelize.define('Commande_Produit', {
    idCommandeProduit: {
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
    produit_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Produit,
            key: 'idProduit'
        },
        onDelete: 'CASCADE'
    },
    quantite: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    prix: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    photo : {
        type : DataTypes.STRING,
        allowNull: true
    }
});
Commande_Produit.prototype.getMontantEnAriary = function() { return new Intl.NumberFormat('fr-MG', { style: 'currency', currency: 'MGA' }).format(this.prix); };

module.exports = Commande_Produit;