const express = require('express');
const cors = require('cors');
require('dotenv').config();
const {Socket, Server} = require('socket.io');



const app = express();
const userRoutes = require('./routes/userRoutes');


const livraisonRoutes = require('./routes/livraisonRoutes');
const searchRoutes = require('./routes/searchRoutes');
const dashbordRoutes = require('./routes/routesDashboard');
const rapportRoutes = require('./routes/rapportRoutes');
const bodyParser = require('body-parser');
const paiementRoutes = require('./routes/paiementRoutes');
const clientRoutes = require('./routes/clientsRoutes');



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use('/profil', express.static('profil'));


app.use('/api/users', userRoutes);


app.use('/api/livraison', livraisonRoutes);
app.use('/api/recherche', searchRoutes);
app.use('/api/stat', dashbordRoutes);
app.use('/api', rapportRoutes);
app.use('/api/paiement', paiementRoutes);
app.use('/api/client',clientRoutes )


app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}))


app.get('/', (req, res) => {
    res.send('Bonjour! API est en marche...');
});

module.exports = app;
