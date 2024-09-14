const Facture = require('../models/facture');
const Commande = require('../models/commande');
const Paiement = require('../models/paiement');


// methode d'envoye d'une facture(email) avec une validation de payement
exports.envoyerFacture = async (req, res) => {
    try {
        const commande_id = req.params.commande_id;
        const commande = await Commande.findByPk(commande_id);
        const { emailClient } = req.body;

        if (!commande) {
            return res.status(404).json({message: 'commande non trouver'});
        }

        const paiement = await Paiement.findOne({ where: { commande_id: commande_id } });

        if (paiement.statut !== 'Effectuer') {
            return res.status(404).json({message: 'Payement pas encore valider'});
        }

        const facture = await Facture.create({
            commande_id,
            numero_facture: 'FAC-${Date.now}',
            total: req.body.total || 0,
            details: req.body.details || 'Dataille de la facture'
        });
        // envoyer facture par email



        res.status(201).json({ message: 'Facture generer avec succes', facture});

    }catch (error) {
        res.status(500).json({ message: 'Echec d\'envoi de la facture', error});
    }
}