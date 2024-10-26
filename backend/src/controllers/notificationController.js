const Notification = require('../models/notification');

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
