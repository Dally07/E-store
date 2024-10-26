const Notification = require('../models/notification');
const Utilisateur = require('../models/utilisateur')

exports.marquerCommeVu = async (req, res) => {
    try {
        const { idNotification } = req.params;

        // Trouver la notification par ID
        const notification = await Notification.findByPk(idNotification);
        if (!notification) {
            return res.status(404).json({ message: 'Notification non trouvée' });
        }

        // Mettre à jour le statut à "Vu"
        await notification.update({ statut: 'Vu' });

        res.status(200).json({ message: 'Notification marquée comme vue avec succès', notification });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du statut de la notification:', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du statut' });
    }
};


// Méthode pour récupérer toutes les notifications
exports.getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.findAll({
            include: { model: Utilisateur,  as: 'utilisateur' }, // Inclut l'utilisateur associé si nécessaire
            order: [['createdAt', 'DESC']] // Trie par date de création, de la plus récente à la plus ancienne
        });
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Erreur lors de la récupération des notifications :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des notifications' });
    }
};

// Méthode pour récupérer une notification par ID
exports.getNotificationById = async (req, res) => {
    try {
        const { idNotification } = req.params;
        const notification = await Notification.findByPk(idNotification, {
            include: { model: Utilisateur,  as: 'utilisateur' } // Inclut l'utilisateur associé si nécessaire
        });

        if (!notification) {
            return res.status(404).json({ message: 'Notification non trouvée' });
        }

        res.status(200).json(notification);
    } catch (error) {
        console.error('Erreur lors de la récupération de la notification :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération de la notification' });
    }
};

