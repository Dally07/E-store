const Paiement = require('../models/paiement');
const Commande = require('../models/commande');

// Traitement du paiement
// Récupérer les détails d'un paiement
exports.getPaiementDetails = async (req, res) => {
    try {
        const { idPaiement } = req.params;

        // Chercher le paiement avec son ID
        const paiement = await Paiement.findByPk(idPaiement, {
            include: [
                {
                    model: Commande,
                    as: 'commande',
                    attributes: ['idCommande', 'total', 'statut']
                }
            ]
        });

        if (!paiement) {
            return res.status(404).json({ message: 'Paiement non trouvé' });
        }

        res.status(200).json(paiement);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du paiement', error });
    }
};

exports.updatePaiementStatut = async (req, res) => {
    try {
        const { idPaiement } = req.params;
        const { statut, montant } = req.body;

        const paiement = await Paiement.findByPk(idPaiement);
        if (!paiement) {
            return res.status(404).json({ message: 'Paiement non trouvé' });
        }

        const commande = await Commande.findByPk(paiement.commande_id);
        if (!commande) {
            return res.status(404).json({ message: 'Commande non trouvée' });
        }

        // Empêcher la modification du statut si le montant est inférieur au total de la commande
        if (montant < commande.total) {
            return res.status(400).json({ message: `Impossible de changer le statut. Le montant payé (${montant}) est inférieur au montant total (${commande.total}).` });
        }

        // Si tout est valide, mettre à jour le statut
        await paiement.update({ statut });

        // Si le statut est "Complété", mettre aussi à jour le statut de la commande
        if (statut === 'Complété') {
            await commande.update({ statut: 'Payé' });
        }

        res.status(200).json({ message: 'Statut du paiement mis à jour avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du statut du paiement', error });
    }
};



// Traitement du paiement sécurisé avec validation du montant
exports.processPaiement = async (req, res) => {
    try {
        const { commande_id, montant, methode, reference_transaction } = req.body;

        // Vérifier si la commande existe
        const commande = await Commande.findByPk(commande_id);
        if (!commande) {
            return res.status(404).json({ message: 'Commande non trouvée' });
        }

        // Vérifier si le montant est suffisant pour la commande
        if (montant < commande.total) {
            return res.status(400).json({ message: `Le montant payé (${montant}) est insuffisant. Le montant total est de ${commande.total}.` });
        }

        // Créer le paiement
        const paiement = await Paiement.create({
            commande_id,
            montant,
            methode,
            reference_transaction,
            statut: montant >= commande.total ? 'Complété' : 'Non payé' // Mettre à jour le statut selon le montant payé
        });

        // Mettre à jour le statut de la commande si le paiement est complet
        if (montant >= commande.total) {
            await commande.update({ statut: 'Payé' });
        }

        res.status(201).json({ message: 'Paiement traité avec succès', paiement });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors du traitement du paiement', error });
    }
};