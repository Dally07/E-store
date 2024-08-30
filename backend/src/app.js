const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');require('dotenv').config();

const app = express();
const authRoutes = require('./routes/authRoutes');

app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
    res.send('Bonjour! API est en marche...');
});

module.exports = app;
