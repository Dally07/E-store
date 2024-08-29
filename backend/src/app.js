const express = require('express');
const { Pool } = require('pg');

const dbconfig = require('./server');

const app = express();
const port = 3000;

const pool = new Pool(dbconfig);

pool.connect((err, Client, release) => {
    if (err) {
        return console.error('erreur de la connection', err.stack);
    }
    console.log ('connection tres reussie', ); release();
});

app.get ('/', (req, res) => {
    res.send('bonjour')
});

app.listen(port, () => {
    console.log('serveur en execution')
});
