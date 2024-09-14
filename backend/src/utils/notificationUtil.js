const Notification = require('../models/notification');
const Utilisateur = require('../models/utilisateur');

// fonction pour envoyer une notification au client
exports.envoyerNotification = async (clientId, message) => {
    try {
        await Notification.create({
            utilisateur_id: clientId, message
        });
    } catch (error) {
        console.error('erreur lors de l\'envoye de la notification', error)
    }
};


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

// Fonction pour envoyer des notifications à l'administrateur et au gestionnaire des commandes
const envoyerNotificationCommande = async (message) => {
    try {
        const utilisateurs = await Utilisateur.findAll({
            where: {
                role: ['Administrateur', 'Gestionnaire des commandes']
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
module.exports = { envoyerNotificationCommande };


