const app = require('./app');
const { sequelize } = require('./config/db');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true
    }
});

const commandeRoutes = require('./routes/commandeRoutes')(io);
const productRoutes = require('./routes/productRoutes')(io);
const notificationRoutes = require('./routes/notificatioRoutes')
app.use('/api/commande', commandeRoutes);
app.use('/api/products', productRoutes);
app.use('/api/notification', notificationRoutes);

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
const Livraison = require('./models/livraison');
require('./models/association');



// Lorsqu'un client se connecte
io.on('connection', (socket) => {
    console.log('Un utilisateur est connecté');

    // Événement pour une nouvelle commande
    socket.on('newOrder', (orderData) => {
        // Diffuse l'événement à tous les clients connectés
        io.emit('newOrderNotification', orderData);
    });

    // Lorsqu'un client se déconnecte
    socket.on('disconnect', () => {
        console.log('Un utilisateur est déconnecté');
    });
});



const PORT = process.env.PORT || 3000;

sequelize.sync({
    force: false
}).then( () => {
    console.log('base de donnees connecte et synchroniser...');
    server.listen(PORT, () => {
        console.log('le serveur est en marche sur le port', PORT);
    });
}).catch(err => {
    console.error('impossible de connecter sur la base de donnees', err);
});