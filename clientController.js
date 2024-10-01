// controllers/clientController.js
const clientService = require('../services/clientService');

// inscription
const register = async (req, res) => {
  try {
    // const newClient = await clientService.registerClient(req.body);
    res.status(201).json({ message: 'Inscription terminée'});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// connexion
const login = async (req, res) => {
  const { emailCli, mdpCli } = req.body;
  try {
    // const { token, client } = await clientService.loginClient(emailCli, mdpCli);
    res.status(200).json({ message : "Connexion réussi" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  register,
  login
};
