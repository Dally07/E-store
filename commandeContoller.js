const Commande = require('../models/commande');
const { envoyerNotification } = require('../utils/notificationUtil');

console.log('mandeha');

// metre a jours la statut du commande
exports.updateStatutCommande = async (req, res) => {
    
    try {
        const { statut } = req.body;
        const commandeId = req.params.id;

        const commande = await Commande.findByPk(commandeId);
        if (!commande) {
            return res.status(400).json({ message: 'commandenon trouver'})
        }

        await commande.update({ statut });

        const message = `Le statut de votre commande a changer : ${statut}`
        await envoyerNotification(commande.client_id, message);

        res.status(200).json({ message: 'statut mis a jours avec succes', commande});
    } catch (error) {
        res.status(500).json({ message: 'erreur lors de la mis a jour du statut', error });
    }
};

