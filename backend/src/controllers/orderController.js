const Commande = require('../models/commande');
const Commande_Produit = require('../models/commande_produit');
const Produit = require('../models/produits');

exports.getOrders = async (req, res) => {
    try {
        const orders = await Commande.findAll({
            include: [{ model: Commande_Produit, include: [Produit] }]
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createOrder = async (req, res) => {
    const { idClient, Produits } = req.body;

    try {
        const newOrder = await Commande.create({ idClient });

        for (const Produit of Produits) {
            await Commande_Produit.create({
                idClient: newOrder.id,
                idProd: item.produit_id,
                quantite: item.quantite,
                prix: item.prix
            });
        }

        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;
        await order.save();

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        await order.destroy();
        res.json({ message: 'Order deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
