// services/clientService.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Client = require('../models/client');
require('dotenv').config();

const registerClient = async (clientData) => {
  const { nomCli, emailCli, telCli, adresseCli, mdpCli } = clientData;

  // Vérifier si l'utilisateur existe déjà
  const existingClient = await Client.findOne({ where: { emailCli } });
  if (existingClient) {
    throw new Error('Email déjà utilisé');
  }

  // Hasher le mot de passe
  const hashedPassword = await bcrypt.hash(mdpCli, 10);

  // Créer l'utilisateur
  const newClient = await Client.create({
    nomCli,
    emailCli,
    telCli,
    adresseCli,
    mdpCli: hashedPassword
  });

  return newClient;
};

const loginClient = async (emailCli, mdpCli) => {
  const client = await Client.findOne({ where: { emailCli } });
  if (!client) {
    throw new Error('Email ou mot de passe incorrect');
  }

  const isMatch = await bcrypt.compare(mdpCli, client.mdpCli);
  if (!isMatch) {
    throw new Error('Email ou mot de passe incorrect');
  }

  const token = jwt.sign({ id: client.id, emailCli: client.emailCli }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  return { token, client };
};

module.exports = {
  registerClient,
  loginClient
};
