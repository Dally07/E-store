const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');
const { authMiddleware } = require('../middleware/authMiddleware');

// Récupérer les notifications pour un utilisateur
router.get('/', authMiddleware, async (req, res) => {
    try {
        const notifications = await Notification.findAll({
            where: { utilisateurId: req.user.idUtilisateur, statut: 'non lu' }
        });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
