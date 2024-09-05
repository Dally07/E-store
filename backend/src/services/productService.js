const Produit = require('../models/produits');


const SEUIL_CRITIQUE = 10;

exports.createProduct = async (productData, user) => {
    const newProduct = await Produit.create(productData);
    //await notificationService.createNotification(user.id, `Produit créé : ${newProduct.nom}`);
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

exports.updateProduct = async (id, productData, user) => {
    const product = await Produit.findByPk(id);
    if (!product) throw new Error('Produit non trouvé');
    await product.update(productData);
    //await notificationService.createNotification(user.id, `Produit mis à jour : ${product.nom}`);
    return product;
};

exports.deleteProduct = async (id, user) => {
    const product = await Produit.findByPk(id);
    if (!product) throw new Error('Produit non trouvé');
    await product.destroy();
    //await notificationService.createNotification(user.id, `Produit supprimé : ${product.nom}`);
};
