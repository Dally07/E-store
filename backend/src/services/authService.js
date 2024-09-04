const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Utilisateur = require('../models/utilisateur');
const secretKey = process.env.JWT_SECRET || 'secret';

exports.register = async (userData) => {
    const {nom, email, mot_de_passe, adresse, role} = await bcrypt.hash(mot_de_passe, 10);

    const newUser = await
    Utilisateur.create({
        nom,
        email,
        mot_de_passe,
        adresse,
        role
    });
    return newUser;
};

exports.login = async (email, mot_de_passe) => {
    const user = await
    Utilisateur.findOne({ where: { email } });
        if (!user) throw new
    Error('utilisateur non trouver');

    const isMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
        if (!isMatch) throw new Error('mot de passe incarrect');

    const token = jwt.sign({ id: user.id, role: user.role}, secretKey, {
        expiresIn: '1h'
    });

    return { user, token };
};