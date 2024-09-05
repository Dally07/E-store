const Produit = require('../models/produits');
const productService = require('../services/productService');
const { envoyerNotificationProduits } = require('../utils/notificationUtil');




exports.createProduct = async (req, res) => {
    try {
        
        const { nom, description, prix, quantite_en_stock, categorie, reference, couleur_disponibles } = req.body;
        
       
        const photo1 = req.file ? req.file.filename : null;

        const message = `Le produit "${nom}" a été créé.`;
        await envoyerNotificationProduits(message);
        
        if (Produit.quantite_en_stock <= 10) {
            const message = `Le produit "${nom}" est en rupture de stock.`;
            await envoyerNotificationProduits(message);
        }
        
        
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
        const productId = req.params.id;

        const product = await Produit.findByPk(productId);

        const message = `Le produit "${product.nom}" a été mis à jour.`;
        await envoyerNotificationProduits(message);

        if (product.quantite_en_stock <= 10) {
            const message = `Le produit "${product.nom}" est en rupture de stock.`;
            await envoyerNotificationProduits(message);
        }

        if (!product) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }

        const { nom, description, prix, quantite_en_stock, categorie, reference, couleur_disponibles } = req.body;

        const photo1 = req.file ? req.file.filename : product.photo1; 


        const updatedProduct = await product.update({
            nom: nom || product.nom,
            description: description || product.description,
            prix: prix || product.prix,
            quantite_en_stock: quantite_en_stock || product.quantite_en_stock,
            categorie: categorie || product.categorie,
            reference: reference || product.reference,
            couleur_disponibles: couleur_disponibles || product.couleur_disponibles,
            photo1: photo1 
        });

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

    const message = `Le produit "${Produit.nom}" a été mis à jour.`;
    await envoyerNotificationProduits(message);
};
