const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Client = require('./client');


const Commande = sequelize.define('Commande', {
    idCommande: {
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
    },
    date_commande: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    statut: {
        type: DataTypes.ENUM( 'En traitement', 'Livrée', 'Annulée', 'En livraison'),
        defaultValue: 'En traitement'
    },
    total: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});
Commande.prototype.getMontantEnAriary = function() { return new Intl.NumberFormat('fr-MG', { style: 'currency', currency: 'MGA' }).format(this.total); };





module.exports = Commande;