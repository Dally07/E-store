const Notification = require('../models/notification');
const Utilisateur = require('../models/utilisateur');

// Fonction pour envoyer des notifications à l'administrateur et au gestionnaire des produits
const envoyerNotificationProduits = async (message) => {
    try {
        const utilisateurs = await Utilisateur.findAll({
            where: {
                role: ['Administrateur', 'Gestionnaire des produits']
            }
        });

        utilisateurs.forEach(async (utilisateur) => {
            await Notification.create({
                message: message,
                utilisateur_id: utilisateur.idUtilisateur,
                statut: 'non lu'
            });
        });
    } catch (error) {
        console.error("Erreur lors de l'envoi des notifications:", error.message);
    }
};

module.exports = { envoyerNotificationProduits };
