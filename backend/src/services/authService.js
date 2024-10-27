const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Utilisateur = require('../models/utilisateur');
const secretKey = process.env.JWT_SECRET || 'secret';

exports.register = async (userData, req) => {
    const { nom, email, mot_de_passe, adresse, role } = userData;
    const photo = req.file ? req.file.filename : null; 
    
    console.log('Photo:', photo);

    // Vérification si l'utilisateur existe déjà
    const existingUser = await Utilisateur.findOne({ where: { email } });
    if (existingUser) {
        throw new Error('Un utilisateur avec cet email existe déjà');
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

    // Création de l'utilisateur
    const newUser = await Utilisateur.create({
        nom,
        email,
        mot_de_passe: hashedPassword,
        adresse,
        role,
        photo
    });

    return newUser;
};

exports.login = async (email, mot_de_passe) => {
    // Recherche de l'utilisateur par email
    const user = await Utilisateur.findOne({ where: { email } });
    if (!user) {
        throw new Error('Utilisateur non trouvé');
    }

    // Vérification du mot de passe
    const isMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if (!isMatch) {
        throw new Error('Mot de passe incorrect');
    }

    // Génération du token JWT
    const token = jwt.sign({ id: user.idUtilisateur, nom: user.nom, role: user.role, photo: user.photo }, secretKey, {
        expiresIn: '1h'
    });

    return { user, token };
};
