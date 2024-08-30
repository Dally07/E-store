const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/utilisateur');

exports.registerUser = async (req, res) => {
    const {nom, email, mot_de_passe} = req.body;

    try{
        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
        const newUser = await User.create({
            nom,
            email,
            mot_de_passe: hashedPassword,
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Erreur du serveur..'});
    }
};


exports.loginUser = async (req, res) => {
    const {email, mot_de_passe} = req.body;

    try {
        const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(401).json({ message: 'utilisateur non enregister' });
            }

            const isMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
            if (!isMatch) {
                return res.status(401).json({ message: 'utilisateur non enregistrer'});
            }

            const token = jwt.sign({ idUtilisateur: user.idUtilisateur}, process.env.JWT_SECRET,  {
                expiresIn: '1h',
            });

            res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'erreur du serveur'});
    }
};