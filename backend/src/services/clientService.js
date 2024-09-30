const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const client = require('../models/client');
const secretKey = process.env.JWT_SECRET || 'secret';

exports.register = async (userData, req) => {
    const { nomCli, emailCli, mdpCli, telCli, adresseCli } = userData;
    const photo = req.file ? req.file.filename : null; 
    
    console.log('Photo:', photo);

    // Vérification si l'utilisateur existe déjà
    const existingClient = await client.findOne({ where: { emailCli } });
    if (existingClient) {
        throw new Error('Un utilisateur avec cet email existe déjà');
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(mdpCli, 10);

    // Création de l'utilisateur
    const newClient = await client.create({
        nomCli,
        emailCli,
        mdpCli: hashedPassword,
        telCli,
        adresseCli,
        photo
    });

    return newClient;
};