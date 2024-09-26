const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Utilisateur = require('../../models/utilisateur');
const secretKey = process.env.JWT_SECRET || 'secret';

// Fonction pour vérifier le rôle de l'utilisateur
const requireRole = (user, roles) => {
  if (!user || !roles.includes(user.role)) {
    throw new Error('Accès interdit. Rôle non autorisé');
  }
};

const resolvers = {
  Query: {
    getAllUsers: async (_, __, { user }) => {
      requireRole(user, ['Administrateur']);
      return await Utilisateur.findAll();
    },

    getUserById: async (_, { id }, { user }) => {
      requireRole(user, ['Administrateur']);
      return await Utilisateur.findByPk(id);
    },

    getProtectedData: async (_, __, { user }) => {
      requireRole(user, ['Administrateur']);
      return "Données protégées";
    }
  },

  Mutation: {
    registerUser: async (_, { nom, email, mot_de_passe, adresse, role }, { user }) => {
      requireRole(user, ['Administrateur']);
      
      const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
      const newUser = await Utilisateur.create({ nom, email, mot_de_passe: hashedPassword, adresse, role });
      return newUser;
    },

    loginUser: async (_, { email, mot_de_passe }) => {
      const utilisateur = await Utilisateur.findOne({ where: { email } });
      if (!utilisateur) throw new Error('Utilisateur non trouvé');

      const isMatch = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);
      if (!isMatch) throw new Error('Mot de passe incorrect');

      const token = jwt.sign({ idUtilisateur: utilisateur.idUtilisateur, role: utilisateur.role }, secretKey, {
        expiresIn: '1h'
      });

      utilisateur.token = token;
      return utilisateur;
    },

    updateUser: async (_, { id, nom, email, adresse, role }, { user }) => {
      requireRole(user, ['Administrateur']);

      const utilisateur = await Utilisateur.findByPk(id);
      if (!utilisateur) throw new Error('Utilisateur non trouvé');

      await utilisateur.update({ nom, email, adresse, role });
      return utilisateur;
    },

    deleteUser: async (_, { id }, { user }) => {
      requireRole(user, ['Administrateur']);

      const utilisateur = await Utilisateur.findByPk(id);
      if (!utilisateur) throw new Error('Utilisateur non trouvé');

      await utilisateur.destroy();
      return 'Utilisateur supprimé';
    }
  }
};

module.exports = resolvers;
