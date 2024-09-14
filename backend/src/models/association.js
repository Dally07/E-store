const Produit = require('./produits');
const ConfigurationPC = require('./config_pc');
const ConfigurationAccessoire = require('./config_accessoire');
const Config_Telephone = require('./config_telephone');
const Config_Imprimante = require('./config_imprimante');

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
