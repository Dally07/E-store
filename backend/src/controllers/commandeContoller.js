const Commande = require('../models/commande');
const Paiement = require('../models/paiement');
const Produit = require('../models/produits');
const Client = require('../models/client')
const ConfigurationPC = require('../models/config_pc');
const ConfigurationImprimante = require('../models/config_imprimante');
const ConfigurationTelephone = require('../models/config_telephone');
const ConfigurationAccessoire = require('../models/config_accessoire');
const  {sequelize }  = require('../config/db');
const { envoyerNotification } = require('../utils/notificationUtil');

console.log('mandeha');

exports.passerCommande = async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
        const { clientId, produitsCommandes, montantPaiement, methodePaiement, referenceTransaction } = req.body;

        // Vérifier si au moins un produit est command
        if (!produitsCommandes || produitsCommandes.length === 0) {
            return res.status(400).json({ message: "La commande doit contenir au moins un produit." });
        }

        // Calculer le total de la commande
        let totalCommande = 0;
        for (let produit of produitsCommandes) {
            const produitData = await Produit.findByPk(produit.idProduit);
            if (!produitData) {
                throw new Error(`Produit avec ID ${produit.idProduit} non trouvé.`);
            }
            // Vérifier si le produit est en stock
            if (produitData.quantite_en_stock < produit.quantite) {
                throw new Error(`Le produit ${produitData.nom} n'a pas assez de stock.`);
            }

            totalCommande += produitData.prix * produit.quantite;
        }

        // Créer la commande
        const nouvelleCommande = await Commande.create({
            client_id: clientId,
            total: totalCommande,
        }, { transaction });

        // Ajouter les produits et mettre à jour le stock
        for (let produit of produitsCommandes) {
            const produitData = await Produit.findByPk(produit.idProduit);

            console.log(produitData);

            // Mettre à jour le stock
            await produitData.update({
                quantite_en_stock: produitData.quantite_en_stock - produit.quantite
            }, { transaction });

            // Associer le produit à la commande
            await nouvelleCommande.addProduit(produitData, { through: { quantite: produit.quantite, prix: produitData.prix }, transaction });

            console.log(produitData);
        }

        // Vérifier le montant du paiement
        let statutPaiement = 'En attente';
        if (montantPaiement >= totalCommande) {
            statutPaiement = 'Complété';
        } else {
            statutPaiement = 'Échoué';
        }

        // Créer le paiement associé
        await Paiement.create({
            commande_id: nouvelleCommande.idCommande,
            montant: montantPaiement,
            methode: methodePaiement,
            reference_transaction: referenceTransaction,
            statut: statutPaiement
        }, { transaction });

        // Valider la transaction
        await transaction.commit();

        return res.status(201).json({
            message: 'Commande et paiement effectués avec succès',
            commande: nouvelleCommande
        });
    } catch (error) {
        console.error('erreur lors de passege de commande:', error)
        // Annuler la transaction en cas d'erreur
        await transaction.rollback();
        return res.status(500).json({ message: error.message });
    }
};


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

exports.getAllCommande = async (req ,res) => {
    try {
        const commande = await Commande.findAll();
        res.status(200).json(commande);
    } catch (error) {
        res.status(500).json({message: 'erreur lors de recuperation des commandes', error});
    }
};

exports.getCommandeDetails = async (req, res) => {
    try {
      const idCommande = req.params.idCommande;
  
      // Récupérer les détails de la commande avec les produits associés et le client
      const commande = await Commande.findByPk(idCommande, {
        include: [
          { model: Produit, as: 'produits', include: [
            { model: ConfigurationPC, as: 'configPC' },
                { model: ConfigurationImprimante, as: 'configImprimante' },
                { model: ConfigurationTelephone, as: 'configTelephone' },
                { model: ConfigurationAccessoire, as: 'configAccessoire' }
          ] }, // Inclure les produits de la commande
          { model: Client , as: 'client'},  // Inclure le client associé à la commande
        ],
      });
  
      if (!commande) {
        return res.status(404).json({ message: "Commande non trouvée" });
      }
  
      // Retourner les détails de la commande
      res.status(200).json(commande);
    } catch (error) {
      console.error("Erreur lors de la récupération des détails de la commande :", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  };

  exports.cancelCommande = async (req, res) => {
    try {
        const { idCommande } = req.params;
        console.log(idCommande)

        // Rechercher la commande par son ID
        const commande = await Commande.findByPk(idCommande);

        if (!commande) {
            return res.status(404).json({ message: 'Commande non trouvée' });
        }

        // Vérifier si la commande est en traitement
        if (commande.statut !== 'En traitement') {
            return res.status(400).json({ message: 'Seules les commandes en traitement peuvent être annulées' });
        }

        // Mettre à jour le statut de la commande à "Annulée"
        await Commande.update(
            { statut: 'Annulée' },
            { where: { idCommande: idCommande } }
        );

        res.status(200).json({ message: 'Commande annulée avec succès' });
    } catch (error) {
        console.error('Erreur lors de l\'annulation de la commande:', error);
        res.status(500).json({ message: 'Erreur lors de l\'annulation de la commande', error: error.message });
    }
};
