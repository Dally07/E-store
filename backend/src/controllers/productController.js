const Produit = require('../models/produits');
const productService = require('../services/productService');


exports.createProduct = async (req, res) => {
    try {
        
        const { nom, description, prix, quantite_en_stock, categorie, reference, couleur_disponibles } = req.body;
        
       
        const photo1 = req.file ? req.file.filename : null;
        
        
        const newProduct = await Produit.create({
            nom,
            description,
            prix,
            quantite_en_stock,
            categorie,
            reference,
            couleur_disponibles,
            photo1
        });
        
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création du produit' });
    }
};


exports.getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await productService.updateProduct(req.params.id, req.body);
        res.status(200).json({ message: 'Produit mis à jour avec succès', updatedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await productService.deleteProduct(req.params.id);
        res.status(200).json({ message: 'Produit supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
