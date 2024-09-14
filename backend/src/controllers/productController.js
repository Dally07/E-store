const Produit = require('../models/produits');
const ConfigurationPC = require('../models/config_pc');
const ConfigurationImprimante = require('../models/config_imprimante');
const ConfigurationTelephone = require('../models/config_telephone');
const ConfigurationAccessoire = require('../models/config_accessoire');

const productService = require('../services/productService');
const { envoyerNotificationProduits } = require('../utils/notificationUtil');



// cree un produit
exports.createProduct = async (req, res) => {
    try {
        const { nom, description, prix, quantite_en_stock, categorie, reference, couleurs_disponibles, configuration } = req.body;
        const photo1 = req.file ? req.file.filename : null;    
        
        let couleursArray = couleurs_disponibles;
        if (typeof couleurs_disponibles === 'string') {
            couleursArray = couleurs_disponibles.split(',').map(couleur => couleur.trim());
        }

        
        const newProduct = await Produit.create({
            nom,
            description,
            prix,
            quantite_en_stock,
            categorie,
            reference,
            couleurs_disponibles:couleursArray,
            photo1
        });

        // cree une configuration correspondante au categorie de produit
        if (categorie === 'PC') {
            await ConfigurationPC.create({
                produit_id: newProduct.idProduit,
                carte_graphique: configuration.carte_graphique,
                ram: configuration.ram,
                rom: configuration.rom,
                marque: configuration.marque,
                ecran: configuration.ecran,
                tactile: configuration.tactile,
                clavier_rgb: configuration.clavier_rgb
            });
        } else if (categorie === 'Imprimante') {
            await ConfigurationImprimante.create({
                produit_id: newProduct.idProduit,
                typeImprimante: configuration.typeImprimante,
                resolution: configuration.resolution,
                marque: configuration.marque,
                vitesseImpression: configuration.vitesseImpression,
                connectivite: configuration.connectivite
            });
        } else if (categorie === 'Telephone') {
            await ConfigurationTelephone.create({
                produit_id: newProduct.idProduit,
                processeur: configuration.processeur,
                ram: configuration.ram,
                marque: configuration.marque,
                stockage: configuration.rom,
                tailleEcran: configuration.tailleEcran
            });
        } else if (categorie === 'Accessoire') {
            await ConfigurationAccessoire.create({
                produit_id: newProduct.idProduit,
                typeAccessoire: configuration.typeAccessoire,
                compatibilite: configuration.compatibilite,
                marque: configuration.marque
            });
        }

        // Notification
        const message = `Le produit "${newProduct.nom}" a été créé.`;
        await envoyerNotificationProduits(message);

        if (newProduct.quantite_en_stock <= 10) {
            const stockMessage = `Le produit "${newProduct.nom}" est en rupture de stock.`;
            await envoyerNotificationProduits(stockMessage);
        }

        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création du produit' });
    }
};


// recuperer tout
exports.getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// recuperer un produit avec toutes ses configuration
exports.getProductById = async (req, res) => {
    try {
        const product = await Produit.findByPk(req.params.id, {
            include: [
                { model: ConfigurationPC, as: 'configPC' },
                { model: ConfigurationImprimante, as: 'configImprimante' },
                { model: ConfigurationTelephone, as: 'configTelephone' },
                { model: ConfigurationAccessoire, as: 'configAccessoire' }
            ]
        });

        if (!product) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


// mettre a jour un produit
exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Produit.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }

        const { nom, description, prix, quantite_en_stock, categorie, reference, couleurs_disponibles, configuration } = req.body;
        const photo1 = req.file ? req.file.filename : product.photo1;

        let couleursArray = couleurs_disponibles;
        if (typeof couleurs_disponibles === 'string') {
            couleursArray = couleurs_disponibles.split(',').map(couleur => couleur.trim());
        }

        const updatedProduct = await product.update({
            nom: nom || product.nom,
            description: description || product.description,
            prix: prix || product.prix,
            quantite_en_stock: quantite_en_stock || product.quantite_en_stock,
            categorie: categorie || product.categorie,
            reference: reference || product.reference,
            couleurs_disponibles: couleursArray || product.couleurs_disponibles,
            photo1: photo1
        });

        // Mise à jour de la configuration en fonction de la catégorie
        if (categorie === 'PC' && configuration) {
            await ConfigurationPC.update({
                carte_graphique: configuration.carte_graphique,
                ram: configuration.ram,
                rom: configuration.rom,
                ecran: configuration.ecran,
                tactile: configuration.tactile,
                marque: configuration.marque,
                clavier_rgb: configuration.clavier_rgb
            }, { where: { produit_id: productId } });
        } else if (categorie === 'Imprimante' && configuration) {
            await ConfigurationImprimante.update({
                typeImprimante: configuration.typeImprimante,
                resolution: configuration.resolution,
                vitesseImpression: configuration.vitesseImpression,
                connectivite: configuration.connectivite,
                marque: configuration.marque
            }, { where: { produit_id: productId } });
        } else if (categorie === 'Telephone' && configuration) {
            await ConfigurationTelephone.update({
                processeur: configuration.processeur,
                ram: configuration.ram,
                rom: configuration.rom,
                marque: configuration.marque
            }, { where: { produit_id: productId } });
        } else if (categorie === 'Accessoire' && configuration) {
            await ConfigurationAccessoire.update({
                typeAccessoire: configuration.typeAccessoire,
                compatibilite: configuration.compatibilite,
                marque: configuration.marque
            }, { where: { produit_id: productId } });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du produit' });
    }
};



exports.deleteProduct = async (req, res) => {
    try {
        await productService.deleteProduct(req.params.id);
        res.status(200).json({ message: 'Produit supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

    const message = `Le produit "${Produit.nom}" a été supprimer.`;
    await envoyerNotificationProduits(message);
};
