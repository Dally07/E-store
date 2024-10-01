const paiement = require('../models/paiement');
const commande = require('../models/commande');
const { notifierPaiement } = require('../utils/notificationUtil');
const Commande = require('../models/commande');
const Paiement = require('../models/paiement');


async function creerPaiement(req, res) {
    try {
        const { commande_id, montant, methode } = req.body;

        const commande = await Commande.findByPk(commande_id);
        if (!commande) {
            return res.status(404).json({message: 'commandenon trouver'});
        }

        const paiement = await Paiement.create({
            commande_id,
            montant,
            methode,
            statut: 'En attente'
        });

        await notifierPaiement(paiement);
        res.status(201).json({message: 'paiement succes', paiement})
    } catch (error) {
        console.error('erreur lors de la creation du paiement :' , error);
        res.status(500).json({message: 'erreur serveur'});
    }


    // maj statut de paiement

    async function mettreAjourStatutPaiment(req, res) {
        try {
            const { id } = req.params;
            const { statut } = req.body

            const paiement = await Paiement.findByPk(id);
            if (!paiement) {
                return res.status(404).json({messahe: 'paiment non trouver'});
            }

            paiement.statut

        } catch (error) {
            console.error('erreur lors de la mis a jour du statut de paiement :' , error);
            res.status(500).json({message: 'erreur serveur'});
        }
    }
    
}