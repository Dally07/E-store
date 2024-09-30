const clientService = require('../services/clientService');
const Client = require('../models/client');

exports.register = async (req, res) => {
    try {
        const newClient = await clientService.register(req.body, req);
        res.status(201).json({ message: 'Utilisateur créé avec succès', newClient });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllClient = async (req, res) => {
    try {
        const client = await Client.findAll();
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



