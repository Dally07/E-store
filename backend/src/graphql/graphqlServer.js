const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

// Charger le schéma GraphQL
const schema = buildSchema(fs.readFileSync(path.join(__dirname, 'schemas', 'authSchema.graphql'), 'utf8'));

// Résolveurs
const authResolvers = require('./resolvers/authResolvers');

// Middleware d'authentification
const authMiddleware = (req) => {
  const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;
  if (!token) {
    throw new Error('Accès non autorisé');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    return { user: decoded };
  } catch (error) {
    throw new Error('Token invalide');
  }
};

// Créer l'application Express
const app = express();

app.use('/graphql', graphqlHTTP((req) => ({
  schema,
  rootValue: authResolvers,
  context: authMiddleware(req),
  graphiql: true // Activer graphiql pour les tests
})));

// Lancer le serveur
app.listen(3001, () => {
  console.log('Le serveur GraphQL est en cours d\'exécution sur http://localhost:3001/graphql');
});
