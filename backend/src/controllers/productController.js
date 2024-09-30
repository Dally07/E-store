const Produit = require('../models/produits');
const ConfigurationPC = require('../models/config_pc');
const ConfigurationImprimante = require('../models/config_imprimante');
const ConfigurationTelephone = require('../models/config_telephone');
const ConfigurationAccessoire = require('../models/config_accessoire');
const productService = require('../services/productService');
const { Op } = require('sequelize');

// cree un produit
exports.createProduct = async (req, res) => {
    try {
        const { nom, description, prix, quantite_en_stock, categorie, reference, couleurs_disponibles, configuration } = req.body;
        const photo1 = req.file ? req.file.filename : null; 
        
        console.log('donne', req.body)

        let config = configuration;
        if (typeof configuration === 'string') {
            config = JSON.parse(configuration);
        }
        
        let couleursArray = couleurs_disponibles;
        if (typeof couleurs_disponibles === 'string') {
            couleursArray = couleurs_disponibles.split(',').map(couleur => couleur.trim());
        }

        let statutStock = 'Disponible';
        if (quantite_en_stock === 0) {
            statutStock = 'Rupture de stock';
        } else if (quantite_en_stock <= 10) {
            statutStock = 'Stock critique';
        }
        
        const newProduct = await Produit.create({
            nom,
            description,
            prix,
            quantite_en_stock,
            categorie,
            reference,
            couleurs_disponibles:couleursArray,
            photo1,
            statutStock
       
        });

        // cree une configuration correspondante au categorie de produit
        if (categorie === 'PC') {
            await ConfigurationPC.create({
                produit_id: newProduct.idProduit,
                carte_graphique: config.carte_graphique,
                processeur: config.processeur,
                ram: config.ram,
                rom: config.rom,
                marque: config.marque,
                ecran: config.ecran,
                tactile: config.tactile,
                clavier_rgb: config.clavier_rgb
            });
        } else if (categorie === 'Imprimante') {
            await ConfigurationImprimante.create({
                produit_id: newProduct.idProduit,
                type_d_impression: config.type_d_impression,
                resolution: config.resolution,
                marque: config.marque,
                vitesse_impression: config.vitesse_impression,
            });
        } else if (categorie === 'Telephone') {
            await ConfigurationTelephone.create({
                produit_id: newProduct.idProduit,
                processeur: config.processeur,
                ram: config.ram,
                marque: config.marque,
                rom: config.rom,
            });
        } else if (categorie === 'Accessoire') {
            await ConfigurationAccessoire.create({
                produit_id: newProduct.idProduit,
                type_accessoire: config.type_accessoire,
                compatibilite: config.compatibilite,
                marque: config.marque
            });
            console.log('ito',config);
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
        // Récupérer tous les produits avec leurs configurations associées
        const products = await Produit.findAll({
            include: [
                { model: ConfigurationPC, as: 'configPC' },
                { model: ConfigurationImprimante, as: 'configImprimante' },
                { model: ConfigurationTelephone, as: 'configTelephone' },
                { model: ConfigurationAccessoire, as: 'configAccessoire' }
            ]
        });

        // Ajouter le statut du stock pour chaque produit
        const productsWithStockStatus = products.map(product => {
            let statutStock = 'Disponible';

            if (product.quantite_en_stock === 0) {
                statutStock = 'Rupture de stock';
            } else if (product.quantite_en_stock <= 10) {
                statutStock = 'Stock critique';
            }

            return {
                ...product.toJSON(), // Convertir le produit en objet JSON
                statutStock // Ajouter le statut du stock
            };
        });

        res.status(200).json(productsWithStockStatus);

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
        
        const quantite_en_stock = product.quantite_en_stock;
        
        if (quantite_en_stock === 0) {
            statutStock = 'Rupture de stock';
        } else if (quantite_en_stock <= 10) {
            statutStock = 'Stock critique';
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
        const { nom, description, prix, quantite_en_stock, categorie, reference, couleurs_disponibles, configuration } = req.body;
        const photo1 = req.file ? req.file.filename : product.photo1;
        
        

        if (!product) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }

        

        let couleursArray = couleurs_disponibles;
        if (typeof couleurs_disponibles === 'string') {
            couleursArray = couleurs_disponibles.split(',').map(couleur => couleur.trim());
        }

        let statutStock = 'Disponible';
        if (quantite_en_stock === 0) {
            statutStock = 'Rupture de stock';
        } else if (quantite_en_stock <= 10) {
            statutStock = 'Stock critique';
        }

        const updatedProduct = await product.update({
            nom: nom || product.nom,
            description: description || product.description,
            prix: prix || product.prix,
            quantite_en_stock: quantite_en_stock || product.quantite_en_stock,
            categorie: categorie || product.categorie,
            reference: reference || product.reference,
            couleurs_disponibles: couleursArray || product.couleurs_disponibles,
            photo1: req.file ? req.file.filename : product.photo1,
            statutStock
        });

        let config = configuration;
        if (typeof configuration === 'string') {
            config = JSON.parse(configuration);
        }

        // Mise à jour de la configuration en fonction de la catégorie
        if (categorie === 'PC' && configuration) {
            await ConfigurationPC.update({
                carte_graphique: config.carte_graphique,
                processeur: config.processeur,
                ram: config.ram,
                rom: config.rom,
                ecran: config.ecran,
                tactile: config.tactile,
                marque: config.marque,
                clavier_rgb: config.clavier_rgb
            }, { where: { produit_id: productId } });
        } else if (categorie === 'Imprimante' && configuration) {
            await ConfigurationImprimante.update({
                type_d_impression: config.type_d_impression,
                resolution: config.resolution,
                vitesse_impression: config.vitesse_impression,
                marque: config.marque
            }, { where: { produit_id: productId } });
        } else if (categorie === 'Telephone' && configuration) {
            await ConfigurationTelephone.update({
                processeur: config.processeur,
                ram: config.ram,
                rom: config.rom,
                marque: config.marque
            }, { where: { produit_id: productId } });
        } else if (categorie === 'Accessoire' && configuration) {
            await ConfigurationAccessoire.update({
                type_accessoire: config.type_accessoire,
                compatibilite: config.compatibilite,
                marque: config.marque
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







