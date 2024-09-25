import React, { useState } from 'react';
import Header from '../composant/Header/header';
import Sidebar from '../composant/sidebar/sidebar';
import { FaFileInvoice, FaTimes, FaTruck } from 'react-icons/fa';

const InfoCommande = () => {
  const [showModal, setShowModal] = useState(false); // État pour afficher/masquer la modal de la livraison
  const [showFactModal, setShowFactModal] = useState(false); // État pour afficher/masquer la modal de la facture
  const [livreur, setLivreur] = useState({ nom: '', voiture: '' }); // État pour les infos du livreur
  const [deliveryDate, setDeliveryDate] = useState(''); // Date de livraison
  const [arrivalDate, setArrivalDate] = useState(''); // Date d'arrivée
  const [commandeStatus, setCommandeStatus] = useState('En cours'); // Statut de la commande


  // Données de test pour la commande et la livraison
  const commande = {
    numero: '24',
    statut: 'En cours',
    client: {
      nom: 'Antsatiana',
      email: 'antsatiana@gmail.com',
      adresse: 'Soanierana Fianarantsoa 301',
      telephone: '+261 345269802',
    },
    produit: {
      nom: 'Acer Nitro 5',
      description: 'Intel® Core™ i5 6th Gen, Intel® HD Graphics 620, 8GB RAM, 256GB SSD',
      prix: '3.500.000 MGA',
      quantite: 1,
      reference: 'AN5-2024',
    },
    livraison: {
      adresse: 'Lot 123, Antananarivo',
      date: '25-09-2024',
      mode: 'Transfert d\'argent',
    },
    sousTotal: '3.500.000 MGA',
    total: '3.500.000 MGA',
    taxe: '0 MGA',
  };

  const handleLivrerClick = () => {
    setShowModal(true); // Afficher la modal lorsqu'on clique sur "Livrer"
  };

  const handleFactClick = () => {
    setShowFactModal(true); // Afficher la modal lorsqu'on clique sur "Livrer"
  };

  const closeModal = () => {
    setShowModal(false);
    setShowFactModal(false) // Fermer la modal
  };

    // Gérer le changement de la date de livraison et mettre à jour le statut
    const handleDeliveryDateChange = (e) => {
      setDeliveryDate(e.target.value);
      setCommandeStatus('En cours de livraison'); // Changer le statut à "En cours de livraison"
    };
  
    // Gérer le changement de la date d'arrivée et mettre à jour le statut
    const handleArrivalDateChange = (e) => {
      setArrivalDate(e.target.value);
      setCommandeStatus('Livrée'); // Changer le statut à "Livrée"
    };
  
    // Gérer le changement des informations du livreur
    const handleLivreurChange = (e) => {
      const { name, value } = e.target;
      setLivreur((prevLivreur) => ({
        ...prevLivreur,
        [name]: value,
      }));
    };

    const handleSubmit = () => {
      // Logique pour envoyer ou valider les données de livraison
      
      setCommandeStatus('Livrée');
      setShowModal(false);
       // Fermer le modal après validation
    };

    const createFact = () => {
      setShowFactModal(false);
    }


  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: '#030C1B' }}>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 overflow-y-auto p-6 pt-20 pl-64 ml-6 mb-6" style={{ backgroundColor: '#030C1B' }}>
          <div className="p-4 mb-6 text-white">
            <div className="flex justify-between items-center mb-6">
              <div className='flex items-center'>
                <div>
                  <h2 className="text-2xl font-bold">Commande n°{commande.numero}</h2>
                </div>
                <div className={`bg-${commandeStatus === 'Livrée' ? 'green' : 'yellow'}-600 text-white rounded ml-4`}>
                  <span className="px-1 text-center">{commandeStatus}</span>
                </div>
              </div>
              <div>
                <button className="flex items-center px-4 py-2 bg-red-800 text-white rounded-lg">
                  <p className="ml-2">Retour</p>
                </button>
              </div>
            </div>

            {/* Boutons d'actions */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex space-x-4">
                <button 
                  onClick={handleLivrerClick} // Ouvrir la modal
                  className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg"
                  style={{backgroundColor: "#041122"}}
                >
                  <FaTruck className='items-center'/> <span className='ml-2'>Livrer</span>
                </button>
                <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg"
                onClick={handleFactClick}
                 style={{backgroundColor: "#041122"}}>
                  <FaFileInvoice className='items-center'/><span className='ml-2'>Facture</span> 
                </button>
                <button className="flex items-center px-4 py-2 text-white rounded-lg" style={{backgroundColor: "#041122"}}>
                  <FaTimes className='items-center'/><span className='ml-2'>Annuler</span>
                </button>
              </div>
            </div>

            {/* Modal */}
            {showModal && (
              <div className="fixed overflow-y-auto  top-0 right-0 w-1/3 h-full bg-gray-900 p-6 z-50 transition-transform duration-300 ease-in-out transform translate-x-0">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-white">Informations de livraison</h3>
                   {/* Bouton de validation */}
                <button 
                  onClick={handleSubmit} 
                  className="bg-blue-600 text-white py-2 rounded-lg mt-4 px-4"
                >
                  Valider la livraison
                </button>
                  <button onClick={closeModal} className="text-white text-2xl">
                    &times;
                  </button>
                </div>

                {/* Contenu de la modal */}
                <div className="text-white">
                  <h4 className="font-bold mb-2">Adresse de livraison</h4>
                  <p>{commande.livraison.adresse}</p>
                  
                  <div className='flex mt-4'>
                    <div>
                    <h4 className="font-bold">Date de livraison prévue</h4>
                  <input 
                    type="date" 
                    value={deliveryDate} 
                    onChange={handleDeliveryDateChange} 
                    className="w-full p-2 rounded text-black"
                  />
                    </div>
                    <div className='ml-6'>
                    <h4 className="font-bold">Date d'arrivée</h4>
                  <input 
                    type="date" 
                    value={arrivalDate} 
                    onChange={handleArrivalDateChange} 
                    className="w-full p-2 rounded  text-black"
                  />
                    </div>
                  

                  
                  </div>

                  <h4 className="font-bold mt-4 mb-2">Nom du livreur</h4>
                  <input 
                    type="text" 
                    name="nom" 
                    value={livreur.nom} 
                    onChange={handleLivreurChange} 
                    className="w-full p-2 text-black rounded-md mb-4"
                    placeholder="Nom du livreur"
                  />

                  
                  <div className='flex'> 
                    <div>
                    <h4 className="font-bold mt-4 mb-2">Numéro de voiture</h4>
                        <input type="text" name="voiture" value={livreur.voiture} onChange={handleLivreurChange} 
                                className="w-full p-2 text-black rounded-md mb-4"
                                placeholder="Numéro de voiture"
                        />
                    </div>
                    <div className='ml-4'>
                    <h4 className="font-bold mt-4 mb-2">Numéro livreur</h4>
                          <input type="text" name="voiture" value={livreur.voiture} onChange={handleLivreurChange} 
                                  className="w-full p-2 text-black rounded-md mb-4"
                                  placeholder="Tel"
                          />
                    </div>
                  </div>


                  <h4 className="font-bold mt-4 mb-2">Mode de paiement</h4>
                  <p>{commande.livraison.mode}</p>
                </div>
                <div className="text-white">
                  <h4 className="font-bold mb-2">Adresse de livraison</h4>
                  <p>{commande.livraison.adresse}</p>
                  

                  <div className="mt-6">
                    <h4 className="font-bold mb-2">Produit commandé</h4>
                    <div className='flex bg-gray-800'>
                      <img src="/path-to-image" alt="product" className="w-20 h-20 object-cover mr-4" />
                    <div className=" p-4 rounded-lg">
                      <p><span className="font-bold">Nom : </span>{commande.produit.nom}</p>
                      <p><span className="font-bold">Référence : </span>{commande.produit.reference}</p>
                      <p><span className="font-bold">Description : </span>{commande.produit.description}</p>
                      <p><span className="font-bold">Quantité : </span>{commande.produit.quantite}</p>
                      <p><span className="font-bold">Prix : </span>{commande.produit.prix}</p>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Modal */}
            {showFactModal && (
              <div className="fixed overflow-y-auto  top-0 right-0 w-1/3 h-full bg-gray-900 p-6 z-50 transition-transform duration-300 ease-in-out transform translate-x-0">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-white">Informations sur la facture</h3>
                   {/* Bouton de validation */}
                <button 
                  onClick={createFact} 
                  className="bg-blue-600 text-white py-2 rounded-lg mt-4 px-4"
                >
                  cree une facture
                </button>
                  <button onClick={closeModal} className="text-white text-2xl">
                    &times;
                  </button>
                </div>
                  

                  <div className="mt-6">
                    <h4 className="font-bold mb-2">Produit commandé</h4>
                    <div className='flex bg-gray-800 mb-6'>
                      <div className='p-4'>
                      <img src="/path-to-image" alt="product" className="w-20 h-20 object-cover mr-4" />
                    </div>
                      
                    <div className=" p-4 rounded-lg">
                      <p><span className="font-bold">Nom : </span>{commande.produit.nom}</p>
                      <p><span className="font-bold">Référence : </span>{commande.produit.reference}</p>
                      <p><span className="font-bold">Description : </span>{commande.produit.description}</p>
                    </div>
                    
                    </div>
                    <div className='flex justify-between'>
                    <p className='flex items-center'><span className="font-bold">Quantité : </span><p className='ml-2 px-3 border-2 border-gray'>{commande.produit.quantite}</p></p>
                    <p><span className="font-bold ">Prix : </span>{commande.produit.prix}</p>
                    </div>
                    
                  </div>
              </div>
              
            )}

            {/* Reste du contenu */}
            <div className=" p-4 rounded-lg mb-0 border-b-2 border-gray" style={{backgroundColor: "#041122"}}>
              <h3 className="text-lg font-bold border-b-2 py-2 border-gray">Articles à commander (1)</h3>
              <div className="flex justify-between items-center p-4 rounded-lg mt-4" style={{backgroundColor: "#041122"}}>
                <div className="flex items-center">
                  <img src="/path-to-image" alt="product" className="w-20 h-20 object-cover mr-4" />
                  <div>
                    <h4 className="font-bold">{commande.produit.nom}</h4>
                    <p className="text-sm">{commande.produit.description}</p>
                    <p className="text-sm">Référence: {commande.produit.reference}</p>
                    <p className="text-sm">Commander ({commande.produit.quantite})</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">Prix: {commande.produit.prix}</p>
                  <p className="text-sm">Taxe (%) : {commande.taxe}</p>
                  <p className="text-sm">Sous-Total : {commande.sousTotal}</p>
                </div>
              </div>
            </div>

            {/* Résumé total */}
            <div className="flex justify-between items-center  p-4 rounded-lg mb-6" style={{backgroundColor: "#041122"}}>
              <div></div>
              <div className="text-right">
                <p className="text-sm text-right">Sous-Total : {commande.sousTotal}</p>
                <p className="text-sm text-right">Impot : {commande.taxe}</p>
                <p className="text-lg font-bold text-right">Total : {commande.total}</p>
              </div>
            </div>

            {/* Informations Client et Commande */}
            <div className="grid grid-cols-2 gap-4">
              <div className=" p-4 rounded-lg" style={{backgroundColor: "#041122"}}>
                <h4 className="font-bold">Client</h4>
                <p className="text-sm">{commande.client.nom}</p>
                <p className="text-sm">{commande.client.email}</p><br />
                <p className="text-xl">Adresse du client</p>
                <p className="text-sm">{commande.client.adresse}</p>
                <p className="text-sm">{commande.client.telephone}</p>
              </div>

              <div className=" p-4 rounded-lg" style={{backgroundColor: "#041122"}}>
                <h4 className="font-bold">Informations sur la commande</h4>
                <p className="text-sm">Date de commande: 12-08-2024</p>
                <p className="text-sm">Statut: {commande.statut}</p>
                <p className="text-sm">Numéro de commande: {commande.numero}</p>
              </div>
              <div className=" p-4 rounded-lg" style={{backgroundColor: "#041122"}}>
                <h4 className="font-bold">Facture (0)</h4>
                <p className="text-sm">Aucune facture trouvée</p>
              </div>

              <div className=" p-4 rounded-lg" style={{backgroundColor: "#041122"}}>
                <h4 className="font-bold">Expéditions (0)</h4>
                <p className="text-sm">Aucune expédition trouvée</p>
              </div>

              <div className=" p-4 rounded-lg col-span-2" style={{backgroundColor: "#041122"}}>
                <h4 className="font-bold">Paiement et Expédition</h4>
                <p className="text-sm">Transfert d'argent</p>
                <p className="text-sm">Mode de paiement</p>
                <p className="text-sm">Ariary MALAGASY</p>
                <p className="text-sm">Devise</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCommande;

