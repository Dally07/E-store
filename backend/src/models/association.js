const Produit = require('./produits');
const ConfigurationPC = require('./config_pc');
const ConfigurationAccessoire = require('./config_accessoire');
const Config_Telephone = require('./config_telephone');
const Config_Imprimante = require('./config_imprimante');
const Client = require('./client');
const Commande = require('./commande');
const commande_produit = require('./commande_produit')

// Associer ConfigurationPC à Produit
Produit.hasOne(ConfigurationPC, {
    foreignKey: 'produit_id',
    as: 'configPC'
});

ConfigurationPC.belongsTo(Produit, {
    foreignKey: 'produit_id',
    as: 'produit'
});

// associer configuration Accessoire
Produit.hasOne(ConfigurationAccessoire, {
    foreignKey: 'produit_id',
    as: 'configAccessoire'
});
ConfigurationAccessoire.belongsTo(Produit, {
    foreignKey: 'produit_id',
    as: 'produit'
});

// Associer ConfigurationTelephone à Produit
Produit.hasOne(Config_Telephone, {
    foreignKey: 'produit_id',
    as: 'configTelephone'
});
Config_Telephone.belongsTo(Produit, {
    foreignKey: 'produit_id',
    as: 'produit'
});

// Associer ConfigurationImprimante à Produit
Produit.hasOne(Config_Imprimante, {
    foreignKey: 'produit_id',
    as: 'configImprimante'
});
Config_Imprimante.belongsTo(Produit, {
    foreignKey: 'produit_id',
    as: 'produit'
});

// association client et commande
Client.hasMany(Commande, { foreignKey: 'client_id', as: 'commandes'});
Commande.belongsTo(Client, { foreignKey: 'client_id', as: 'client'});

// association commande et produit
Commande.belongsToMany(Produit, { through: commande_produit, foreignKey: 'commande_id',  as: 'produits'});
Produit.belongsToMany(Commande, { through: commande_produit, foreignKey: 'produit_id', as: 'commandes'});