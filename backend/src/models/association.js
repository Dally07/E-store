const Produit = require('./produits');
const ConfigurationPC = require('./config_pc');
const ConfigurationAccessoire = require('./config_accessoire');
const Config_Telephone = require('./config_telephone');
const Config_Imprimante = require('./config_imprimante');
const Client = require('./client');
const Commande = require('./commande');
const commande_produit = require('./commande_produit')
const Paiement = require('./paiement')
const Livraison = require('./livraison');
const Utilisateur = require('./utilisateur');
const Notification = require('./notification');
const Facture = require('./facture');

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

// association paiment et commande
Commande.hasMany(Paiement, {
    foreignKey: 'commande_id',
    as: 'paiement'
});

//commande et paiement
Paiement.belongsTo(Commande, {
    foreignKey: 'commande_id',
    as: 'commande'
});

Commande.hasMany(Livraison, {
    foreignKey: 'commande_id', onDelete: 'CASCADE'
});

// association commande et livraison
Commande.hasOne(Livraison, {foreignKey: 'commande_id', as: 'livraison', ondelete: 'CASCADE'});
Livraison.belongsTo(Commande, {foreignKey: 'commande_id', as: 'commande', onDelete: 'CASCADE'});

// LIVRAISON AVEC CLIENT
Livraison.belongsTo(Client, {foreignKey: 'client_id', as: 'client'});


// Association : chaque notification appartient à un utilisateur
Notification.belongsTo(Utilisateur, { foreignKey: 'utilisateur_id', as: 'utilisateur' });

Utilisateur.hasMany(Notification, { foreignKey: 'utilisateur_id', as: 'notifications' });
