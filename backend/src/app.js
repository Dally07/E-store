const express = require('express');
const cors = require('cors');
require('dotenv').config();


const app = express();
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const commandeRoutes = require('./routes/commandeRoutes');
const livraisonRoutes = require('./routes/livraisonRoutes');
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));


app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/commande', commandeRoutes);
app.use('/api/livraison', livraisonRoutes);

app.get('/', (req, res) => {
    res.send('Bonjour! API est en marche...');
});

module.exports = app;
