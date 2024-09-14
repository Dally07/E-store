const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const utilisateur = require('../models/utilisateur');

// registration des utilisateurs avec hachage de mot de passe
exports.registerUser = async (req, res) => {
    const {nom, email, mot_de_passe} = req.body;

    try{
        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
        const newutilisateur = await utilisateur.create({
            nom,
            email,
            mot_de_passe: hashedPassword,
        });
        res.status(201).json(newutilisateur);
    } catch (error) {
        res.status(500).json({ message: 'Erreur du serveur..'});
    }
};

// connection des utilisateur avec validation de token
exports.loginUser = async (req, res) => {
    const {email, mot_de_passe} = req.body;

    try {
        const utilisateur = await utilisateur.findOne({ where: { email } });
            if (!utilisateur) {
                return res.status(401).json({ message: 'utilisateur non enregister' });
            }

            const isMatch = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);
            if (!isMatch) {
                return res.status(401).json({ message: 'utilisateur non enregistrer'});
            }

            const token = jwt.sign({ idUtilisateur: utilisateur.idUtilisateur}, process.env.JWT_SECRET,  {
                expiresIn: '1h',
            });

            res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'erreur du serveur'});
    }
};