const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('API est en marche...');
});

module.exports = app;
