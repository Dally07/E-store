const Produit = require('./produits');
const Panier = require('./pannier'); // Assurez-vous d'importer le modèle Panier
const Panier_Produit = require('./Panier_Produit');
const ConfigurationPC = require('./config_pc');
const ConfigurationAccessoire = require('./config_accessoire');
const Config_Telephone = require('./config_telephone');
const Config_Imprimante = require('./config_imprimante');
const Client = require('./client');
const Commande = require('./commande');
const commande_produit = require('./commande_produit');

// Associer ConfigurationPC à Produit
Produit.hasOne(ConfigurationPC, {
    foreignKey: 'produit_id',
    as: 'configPC'
});
ConfigurationPC.belongsTo(Produit, {
    foreignKey: 'produit_id',
    as: 'produit'
});

// Associer ConfigurationAccessoire à Produit
Produit.hasOne(ConfigurationAccessoire, {
    foreignKey: 'produit_id',
    as: 'configAccessoire'
});
ConfigurationAccessoire.belongsTo(Produit, {
    foreignKey: 'produit_id',
    as: 'produit'
});

// Associer Config_Telephone à Produit
Produit.hasOne(Config_Telephone, {
    foreignKey: 'produit_id',
    as: 'configTelephone'
});
Config_Telephone.belongsTo(Produit, {
    foreignKey: 'produit_id',
    as: 'produit'
});

// Associer Config_Imprimante à Produit
Produit.hasOne(Config_Imprimante, {
    foreignKey: 'produit_id',
    as: 'configImprimante'
});
Config_Imprimante.belongsTo(Produit, {
    foreignKey: 'produit_id',
    as: 'produit'
});

// Association Client et Commande
Client.hasMany(Commande, { foreignKey: 'client_id', as: 'commandes' });
Commande.belongsTo(Client, { foreignKey: 'client_id', as: 'client' });

// Association Commande et Produit
Commande.belongsToMany(Produit, { through: commande_produit, foreignKey: 'commande_id', as: 'produits' });
Produit.belongsToMany(Commande, { through: commande_produit, foreignKey: 'produit_id', as: 'commandes' });

// Association entre Panier et Panier_Produit
Panier.hasMany(Panier_Produit, {
    foreignKey: 'panier_id', // clé étrangère dans Panier_Produit
    sourceKey: 'idPanier',   // clé primaire dans Panier
    as: 'produits'            // Alias pour l'association
});
Panier_Produit.belongsTo(Produit, {
    foreignKey: 'produit_id',
    as: 'produit', // Ajoutez cet alias
});

Panier_Produit.belongsTo(Panier, {
    foreignKey: 'panier_id', // clé étrangère dans Panier_Produit
    targetKey: 'idPanier',   // clé primaire dans Panier
});

// Association entre Panier_Produit et Produit
Panier_Produit.belongsTo(Produit, {
    foreignKey: 'produit_id', // clé étrangère dans Panier_Produit
    targetKey: 'idProduit',    // clé primaire dans Produit
});

// Associer les modèles Panier_Produit à Produit
Produit.hasMany(Panier_Produit, {
    foreignKey: 'produit_id', // clé étrangère dans Panier_Produit
    sourceKey: 'idProduit',    // clé primaire dans Produit
    as: 'panierProduits'       // Alias pour l'association
});

module.exports = { Produit, Panier, Panier_Produit, ConfigurationPC, ConfigurationAccessoire, Config_Telephone, Config_Imprimante, Client, Commande, commande_produit };
