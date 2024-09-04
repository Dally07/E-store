const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');require('dotenv').config();

const app = express();
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');




app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Bonjour! API est en marche...');
});

module.exports = app;
