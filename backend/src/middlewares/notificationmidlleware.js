const sendNotification = async (req, res, next) => {
    try {
        const userId = req.user.id;
        // Vérifiez si l'utilisateur a le rôle administrateur
        if (req.user.role === 'Administrateur') {
            const action = req.method === 'POST' ? 'création' : 'modification';
            const message = `Un produit a été ${action} par l'utilisateur ${userId}.`;
            
            // Logique pour envoyer la notification
            await Notification.create({
                utilisateur_id: userId,
                message: message,
                statut: 'non lu'
            });

            req.app.get('io').emit('notification', {
                role: 'Administrateur',
                message: message
            })

            console.log("Notification envoyée à l'administrateur.");
        } else {
            console.log("Aucune notification envoyée. Utilisateur non administrateur.");
        }

        next();
    } catch (error) {
        console.error("Erreur lors de l'envoi de la notification :", error);
        next(error);
    }
};
