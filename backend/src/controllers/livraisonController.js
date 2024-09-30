const Commande = require('../models/commande');
const Livraison = require('../models/livraison');
const Client = require('../models/client')
const Paiement = require('../models/paiement')



// cree une livraison avec heure de depart pour valider la staut du commande(en cours de livraison)
exports.createLivraison = async (req, res) => {
    try {
        const { commande_id, nom_livreur, vehicule, numero_vehicule, telephone_livreur, heure_depart } = req.body;

        const commande = await Commande.findByPk(commande_id, {
            include: { model: Client, as: 'client', attributes: ['adresseCli']}
        });

        if (!commande) {
            return res.status(404).json({ message: 'commande non trouver'});
    }

    if (commande.statut !== 'En traitement') {
        return res.status(400).json({message: 'la commande doit etre en traitement pour etre mis en livraison'});
    }

    if (!commande.client) {
        return res.status(400).json({message: 'client non trouver pour cette commande'})
    }

    const adresse_livraison = commande.client.adresseCli;

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
       
        res.status(201).json({message: 'Livraison en cours avec succes',livraison});

    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la livraison', error: error.message });
    }
};


// modification du livraison en ajoutant l'heure d'arriver du livraison pour changer le statut du commade(terminer)
exports.updateLivraison = async (req, res) => {
    try {
        const { heure_arrivee} = req.body;
        const livraisonId = req.params.id;

        const livraison = await Livraison.findByPk(livraisonId);
        if (!livraison) return res.status(404).json({ message: 'Livraison non trouvée' });
        
        const commande = await Commande.findByPk(livraison.commande_id);
        if (!commande) {
            return res.status(404).json({message: 'commande non trouver'});
        }

        if (commande.statut !== 'En livraison') {
            return res.status(400).json({message: 'la commande doit etre en livraison pour etre marque comme Livrée'})
        }

        await livraison.update({heure_arrivee});
        await Commande.update({ statut: 'Livrée'}, { where: { idCommande: livraison.commande_id } });
        
        res.status(200).json({ message: 'Livraison mise à jour avec succès' });

    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la livraison', error });
    }
};

exports.getLivraisonById = async (req, res) => {
    try {
        const livraisonId = req.params.id;
        const livraison = await Livraison.findByPk(livraisonId, {
            include: [
                {
                    model: Commande,
                    
                    attributes: ['idCommande', 'date_commande'], 
                    include: [
                        {
                            model: Client,
                            as: 'client',
                            attributes: ['nomCli', 'emailCli', 'adresseCli', 'telCli'] 
                        },
                        {
                            model: Paiement, 
                            as: 'paiement',
                        }
                    ]
                }
            ]
        });

        if (!livraison) {
            return res.status(404).json({ message: 'Livraison non trouvée' });
        }

        res.status(200).json(livraison);
    } catch (error) {
        console.error('Erreur lors de la récupération de la livraison:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération de la livraison', error: error.message });
    }
};


exports.getAllLivraisons = async (req, res) => {
    try {
        const livraisons = await Livraison.findAll({
            include: {
                model: Commande,
                include: {
                    model: Client,
                    as: 'client',
                    attributes: ['nomCli', 'emailCli', 'adresseCli'] 
                }
            }
        });

        res.status(200).json(livraisons);
    } catch (error) {
        console.error('Erreur lors de la récupération des livraisons:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des livraisons', error: error.message });
    }
};


