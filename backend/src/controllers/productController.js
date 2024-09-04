const Product = require('../models/produits');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createProduct = async (req, res) => {
    const {  nomProd, prixProd, categorieProd } = req.body;

    try {
        const newProduct = await Product.create({
            nomProd, 
            prixProd, 
            categorieProd
        
        });

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateProduct = async (req, res) => {
    const { idProd } = req.params;
    const { nomProd, prixProd, categorieProd } = req.body;

    try {
        const product = await Product.findByPk(idProd);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.nom = nomProd;
        product.priX = prixProd;
        product.categorie = categorieProd;
        await product.save();

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteProduct = async (req, res) => {
    const { idProd } = req.params;

    try {
        const product = await Product.findByPk(idProd);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.destroy();
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
