const Commande = require('../models/commande');
const Livraison = require('../models/livraison');
const { envoyerNotification } = require('../utils/notificationUtil')



// cree une livraison avec heure de depart pour valider la staut du commande(en cours de livraison)
exports.createLivraison = async (req, res) => {
    try {
        const { commande_id, nom_livreur, vehicule, numero_vehicule, telephone_livreur, heure_depart } = req.body;

        const commande = await Commande.findByPk(commande_id, {
            include: { model: Client, attributes: ['adresse']}
        });

        if (!commande) {
            return res.statut(404).json({ message: 'commande non trouver'});
    }

    const adresse_livraison = commande.Client.adresse;

        const livraison = await Livraison.create({
            commande_id,
            nom_livreur,
            vehicule,
            numero_vehicule,
            telephone_livreur,
            adresse_livraison,
            heure_depart
        });

        await Commande.update({ statut: 'En livraison'}, { where: {idCommande: commande_id } });

        //notification envoyer au client
        const message = 'votre commande est en cours de livraison.';
        const commandes = await Commande.findByPk(commande_id);
        await envoyerNotification(commandes.clent_id, message);


        res.status(201).json('Livraison en cours avec succes',livraison);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la livraison', error });
    }
};


// modification du livraison en ajoutant l'heure d'arriver du livraison pour changer le statut du commade(terminer)
exports.updateLivraison = async (req, res) => {
    try {
        const { heure_arrivee} = req.body;
        const livraisonId = req.params.id;

        const livraison = await Livraison.findByPk(livraisonId);
        if (!livraison) return res.status(404).json({ message: 'Livraison non trouvée' });

        await Commande.update({ statut: 'Livree'}, { where: { idCommande: livraison.commande_id } });


        // notification envoyer au cliet=nt
        const message =  'Votre commande a ete livrer avec succes.';
        const commande = await Commande.findByPk(livraison.commande_id);
        await envoyerNotification(commande.clent_id, message);
        
        res.status(200).json({ message: 'Livraison mise à jour avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la livraison', error });
    }
};


