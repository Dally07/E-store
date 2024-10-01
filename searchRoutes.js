const express = require('express');
const { rechercher }   = require('../controllers/searchController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const route = express.Router();


route.get('/', authMiddleware, rechercher);

module.exports = route;