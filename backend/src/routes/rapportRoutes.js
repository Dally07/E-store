// routes/rapportRoutes.js
const express = require('express');
const { authMiddleware, requireRole } = require('../middlewares/authMiddleware');
const rapportController = require('../controllers/rapportController');
const router = express.Router();

// Route pour récupérer le rapport journalier
router.get('/rapport-journalier', authMiddleware, rapportController.getRapportJournalier);

module.exports = router;
