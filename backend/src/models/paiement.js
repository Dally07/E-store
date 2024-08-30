const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Commande = require('./commande');

const Paiement = sequelize.define('Paiement', {
    idPaiement: {
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
    montant: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    methode: {
        type: DataTypes.ENUM('Carte de Crédit', 'Mvola', 'Virement Bancaire'),
        allowNull: false
    },
    reference_transaction: {
        type: DataTypes.STRING(255),
        unique: true
    },
    statut: {
        type: DataTypes.ENUM('En attente', 'Complété', 'Échoué', 'Remboursé'),
        defaultValue: 'En attente'
    },
    date_paiement: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = Paiement;