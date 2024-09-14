const express = require('express');
const { rechercher }   = require('../controllers/searchController');
const route = express.Router();


route.get('/', rechercher);

module.exports = route;