const authService = require('../services/authService');
const Utilisateur = require('../models/utilisateur'); 

// registration
exports.register = async (req, res) => {
    try {
        const newUser = await authService.register(req.body, req);
        res.status(201).json({ message: 'Utilisateur créé avec succès', newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// connection
exports.login = async (req, res) => {
    try {
        const { email, mot_de_passe } = req.body;
        const { user, token } = await authService.login(email, mot_de_passe);
        res.status(200).json({ message: 'Connexion réussie', token, user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// voir tout
exports.getAllUsers = async (req, res) => {
    try {
        const users = await Utilisateur.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// voir un utilisateur
exports.getUserById = async (req, res) => {
    try {
        const user = await Utilisateur.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// modifier un utilisateur
exports.updateUser = async (req, res) => {
    try {
        console.log(req.params.id)
        console.log(req.body)
        
        const user = await Utilisateur.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

        await user.update(req.body);
        res.status(200).json({ message: 'Utilisateur mis à jour', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// supprimer un utilisateur
exports.deleteUser = async (req, res) => {
    try {
        const user = await Utilisateur.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

        await user.destroy();
        res.status(200).json({ message: 'Utilisateur supprimé' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};