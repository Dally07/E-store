const app = require('./app');
const { sequelize } = require('./config/db');

const Utilisateur = require('./models/utilisateur');
const Client = require('./models/client');
const Commande = require('./models/commande');
const Panier = require('./models/pannier');
const Produit = require('./models/produits');
const Facture = require('./models/facture');
const Notification = require('./models/notification');
const Paiement = require('./models/paiement');
const Commande_Produit = require('./models/commande_produit');
const Config_Accessoire = require('./models/config_accessoire');
const Config_Imprimante = require('./models/config_imprimante');
const Config_Telephone = require('./models/config_telephone');
const Config_Pc = require('./models/config_pc');
const Panier_Produit = require('./models/Panier_Produit');



const PORT = process.env.PORT || 5000;

sequelize.sync({
    force: false
}).then( () => {
    console.log('base de donnees connecte...');
    app.listen(PORT, () => {
        console.log('le serveur est en marche sur le port ${PORT}');
    });
}).catch(err => {
    console.error('impossible de connecter sur la base de donnees', err);
});