const Produit = require('../models/produits');

exports.createProduct = async (productData) => {
    const newProduct = await Produit.create(productData);
    return newProduct;
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

exports.updateProduct = async (id, productData) => {
    const product = await Produit.findByPk(id);
    if (!product) throw new Error('Produit non trouvé');
    await product.update(productData);
    return product;
};

exports.deleteProduct = async (id) => {
    const product = await Produit.findByPk(id);
    if (!product) throw new Error('Produit non trouvé');
    await product.destroy();
};
