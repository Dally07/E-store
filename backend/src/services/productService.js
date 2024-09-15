const Produit = require('../models/produits');
const ConfigurationPC = require('../models/config_pc');
const ConfigurationImprimante = require('../models/config_imprimante');
const ConfigurationTelephone = require('../models/config_telephone');
const ConfigurationAccessoire = require('../models/config_accessoire');

const SEUIL_CRITIQUE = 10;

// Création d'un produit avec gestion de la configuration
exports.createProduct = async (productData, configurationData, user) => {
    const newProduct = await Produit.create(productData);

    // Gestion de la configuration selon la catégorie
    if (productData.categorie === 'PC') {
        await ConfigurationPC.create({
            produit_id: newProduct.idProduit,
            carte_graphique: configurationData.carte_graphique,
            ram: configurationData.ram,
            rom: configurationData.rom,
            ecran: configurationData.ecran,
            tactile: configurationData.tactile,
            clavier_rgb: configurationData.clavier_rgb
        });
    } else if (productData.categorie === 'Imprimante') {
        await ConfigurationImprimante.create({
            produit_id: newProduct.idProduit,
            typeImprimante: configurationData.typeImprimante,
            resolution: configurationData.resolution,
            vitesseImpression: configurationData.vitesseImpression,
            connectivite: configurationData.connectivite
        });
    } else if (productData.categorie === 'Telephone') {
        await ConfigurationTelephone.create({
            produit_id: newProduct.idProduit,
            processeur: configurationData.processeur,
            ram: configurationData.ram,
            stockage: configurationData.stockage,
            tailleEcran: configurationData.tailleEcran
        });
    } else if (productData.categorie === 'Accessoire') {
        await ConfigurationAccessoire.create({
            produit_id: newProduct.idProduit,
            typeAccessoire: configurationData.typeAccessoire,
            compatibilite: configurationData.compatibilite,
            marque: configurationData.marque
        });
    }

    return newProduct;
};

// Mise à jour d'un produit et de sa configuration
exports.updateProduct = async (id, productData, configurationData, user) => {
    const product = await Produit.findByPk(id);
    if (!product) throw new Error('Produit non trouvé');

    await product.update(productData);

    // Mise à jour de la configuration selon la catégorie
    if (productData.categorie === 'PC') {
        await ConfigurationPC.update({
            carte_graphique: configurationData.carte_graphique,
            ram: configurationData.ram,
            rom: configurationData.rom,
            ecran: configurationData.ecran,
            tactile: configurationData.tactile,
            clavier_rgb: configurationData.clavier_rgb
        }, { where: { produit_id: id } });
    } else if (productData.categorie === 'Imprimante') {
        await ConfigurationImprimante.update({
            typeImprimante: configurationData.typeImprimante,
            resolution: configurationData.resolution,
            vitesseImpression: configurationData.vitesseImpression,
            connectivite: configurationData.connectivite
        }, { where: { produit_id: id } });
    } else if (productData.categorie === 'Telephone') {
        await ConfigurationTelephone.update({
            processeur: configurationData.processeur,
            ram: configurationData.ram,
            stockage: configurationData.stockage,
            tailleEcran: configurationData.tailleEcran
        }, { where: { produit_id: id } });
    } else if (productData.categorie === 'Accessoire') {
        await ConfigurationAccessoire.update({
            typeAccessoire: configurationData.typeAccessoire,
            compatibilite: configurationData.compatibilite,
            marque: configurationData.marque
        }, { where: { produit_id: id } });
    }

  
    return product;
};

exports.getAllProducts = async () => {
    const products = await Produit.findAll();
    return products;
};

exports.getProductById = async (id) => {
    const product = await Produit.findByPk(id);
    if (!product) throw new Error('Produit non trouvé');
    return product;
};

exports.deleteProduct = async (id, user) => {
    const product = await Produit.findByPk(id);
    if (!product) throw new Error('Produit non trouvé');
    await product.destroy();


};
