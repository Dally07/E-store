import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import Header from '../composant/Header/header';
import Sidebar from '../composant/sidebar/sidebar';
import { FaFileInvoice, FaTimes, FaTruck } from 'react-icons/fa';

const InfoCommande = () => {
  const { idCommande } = useParams(); 
  const {livraisonId} = useParams();
  const [commandeId, setCommandeId] = useState('');
  const [nomLivreur, setNomLivreur] = useState('');
  const [vehicule, setVehicule] = useState('');
  const [numeroVehicule, setNumeroVehicule] = useState('');
  const [telephoneLivreur, setTelephoneLivreur] = useState('');
  const [heureDepart, setHeureDepart] = useState('');
  const [heureArrivee, setHeureArrivee] = useState('');
  const [showModal, setShowModal] = useState(false); 
  const [showFactModal, setShowFactModal] = useState(false); 
  const [livreur, setLivreur] = useState({ nom: '', voiture: '' }); 
  const [deliveryDate, setDeliveryDate] = useState(''); 
  const [arrivalDate, setArrivalDate] = useState(''); 
  const [commandeStatus, setCommandeStatus] = useState('En cours'); 
  const [loading, setLoading] = useState(true);
  const [commande, setCommande] = useState(null)
  const [livraison, setLivraison] = useState([]);
  const [responseMessage, setResponsesMessage] = useState('');

  useEffect(() => {
    // Appel à l'API pour récupérer les détails de la commande
    const fetchCommandeDetails = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`http://localhost:3001/api/commande/${idCommande}`);
        setCommande(response.data);
        console.log(response.data)
        if (response.data.livraison) {
          const livraisonData = response.data.livraison;
          setLivraison(livraisonData);
          setNomLivreur(livraisonData.nom_livreur);
          setVehicule(livraisonData.vehicule);
          setNumeroVehicule(livraisonData.numero_vehicule);
          setTelephoneLivreur(livraisonData.telephone_livreur);
          setHeureDepart(livraisonData.heure_depart);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des détails de la commande :", error);
      } 
    };

    fetchCommandeDetails();
  }, [idCommande]);

  useEffect(() => {
    const fetchLivraison = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/livraison/${livraisonId}`);

        setLivraison(response.data.livraison)
      } catch(error) {
        console.error('errreur lors de la recuperation des donnees de la livraison : ', error)
      }
    };
    fetchLivraison();
    
  }, [livraisonId])

  const annulerComande = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3001/api/commande/${idCommande}/annuler`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      console.log(response)
      alert(response.data.message);
    } catch (error) {
      console.error('erreur poyur annuler le commande', error);
      alert('erreur annulation commande');
    }
  }


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
     // Changer le statut à "En cours de livraison"
    };
  
    // Gérer le changement de la date d'arrivée et mettre à jour le statut
    const handleArrivalDateChange = (e) => {
      setArrivalDate(e.target.value);
       // Changer le statut à "Livrée"
    };
  
    // Gérer le changement des informations du livreur
    const handleLivreurChange = (e) => {
      const { name, value } = e.target;
      setLivreur((prevLivreur) => ({
        ...prevLivreur,
        [name]: value,
      }));
    };

    const handleSubmit = async (e) => { 
      e.preventDefault();

      const data = {
        commande_id: idCommande,
        nom_livreur: nomLivreur,
        vehicule: vehicule,
        numero_vehicule: numeroVehicule,
        telephone_livreur: telephoneLivreur,
        heure_depart: heureDepart

      }
      // Logique pour envoyer ou valider les données de livraison
      try {
        // Appel à l'API pour créer une livraison
        const response = await axios.post('http://localhost:3001/api/livraison',data );
        console.log('reponse api:', response.data)

          setResponsesMessage(response.data.message) ;
      } catch (error) {
        console.error("Erreur lors de la création de la livraison :", error);
        setResponsesMessage('erreur de la creation de livraison');
      }
      setShowModal(false);
       // Fermer le modal après validation
    };

    const getBackground = (statut) => {
      switch(statut) {
        case 'En traitement' : return 'bg-yellow-500';
        case 'En livraison' : return 'bg-green-500';
        case 'Livrée' : return 'bg-green-800';
        case 'Annulée' : return 'bg-gray-500';
      }
     }

     const formatDate = (dateString) => {

  const date = new Date(dateString);
  if (isNaN(date)) {
    return '';
  }
  const day = String(date.getDate());
  const month = String(date.getMonth() + 1);
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
 };
    

    const createFact = () => {
      setShowFactModal(false);
    }
    if (!commande) {
      return <div>chargemen</div>
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
                  <h2 className="text-2xl font-bold">Commande n°{commande.idCommande}</h2>
                </div>
                <div className={`bg-${commandeStatus === 'Livrée' ? 'green' : 'yellow'}-600 text-white rounded ml-4`}>
                  <span className={`px-1 text-center rounded-lg px-2 ${getBackground(commande.statut)}`}>{commande.statut}</span>
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
                <button className="flex items-center px-4 py-2 text-white rounded-lg" style={{backgroundColor: "#041122"}} onClick={annulerComande}>
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
                   {responseMessage && <p>{responseMessage}</p>}
                  Valider la livraison
                </button>
                  <button onClick={closeModal} className="text-white text-2xl">
                    &times;
                  </button>
                </div>

                {/* Contenu de la modal */}
                <div className="text-white">
                <h4 className="font-bold mb-2" onChange={(e) => setCommandeId}>commande #{commande.idCommande}</h4>
                  
                  <div className='flex mt-4'>
                    <div>
                    <h4 className="font-bold">Date de livraison prévue</h4>
                  <input 
                    type="date" 
                    className="w-full p-2 rounded text-black"
                    value={heureDepart}
                    onChange={(e) => setHeureDepart(e.target.value)}
                    required
                  />
                    </div>
                    <div className='ml-6'>
                    <h4 className="font-bold">Date d'arrivée</h4>
                  <input 
                    type="date" 
                    className="w-full p-2 rounded  text-black"
                    value={arrivalDate}
                    onChange={handleArrivalDateChange}
                  />
                    </div>
                  

                  
                  </div>
                <div className='flex'>
                  <div>
                  <h4 className="font-bold mt-4 mb-2">Vehicule</h4>
                  <input 
                    type="text" 
                    name="nom" 
                    className="w-full p-2 text-black rounded-md mb-4"
                    placeholder="Vehicule"
                    value={vehicule}
            onChange={(e) => setVehicule(e.target.value)}
            required
                  />
                  </div>
                  <div className='ml-4'>
                  <h4 className="font-bold mt-4 mb-2">Nom du livreur</h4>
                  <input 
                    type="text" 
                    name="nom" 
                    className="w-full p-2 text-black rounded-md mb-4"
                    placeholder="Nom du livreur"
                    value={telephoneLivreur}
            onChange={(e) => setNomLivreur(e.target.value)}
            required
                  />
                  </div>
                </div>
                  

                  
                  <div className='flex'> 
                    <div>
                    <h4 className="font-bold mt-4 mb-2">Numéro de voiture</h4>
                        <input type="text" name="voiture"
                                className="w-full p-2 text-black rounded-md mb-4"
                                placeholder="Numéro de voiture"
                                value={numeroVehicule}
                                onChange={(e) => setNumeroVehicule(e.target.value)}
                                required
                        />
                    </div>
                    <div className='ml-4'>
                    <h4 className="font-bold mt-4 mb-2">Numéro livreur</h4>
                          <input type="text" name="voiture" 
                                  className="w-full p-2 text-black rounded-md mb-4"
                                  placeholder="Tel"
                                  value={telephoneLivreur}
            onChange={(e) => setTelephoneLivreur(e.target.value)}
            required
                          />
                    </div>
                  </div>
                  

                  <div className="mt-6">
                    <h4 className="font-bold mb-2">Produit commandé</h4> 
                    {commande.produits.map((produit, index) => (

                    <div className='flex bg-gray-800'>
                      <img  src={`http://localhost:3001/uploads/${produit.photo1}`}  alt="product" className="w-20 h-20 object-cover mr-4" />
                    <div className=" p-4 rounded-lg">
                      <p><span className="font-bold">Nom : </span>{produit.nom}</p>
                      <p><span className="font-bold">Ref : </span>{produit.reference}</p>
                      {produit.categorie === 'PC' && produit.configPC ? (
                          <p className="text-sm">Configutation : {produit.configPC.processeur} / {produit.configPC.ram} / {produit.configPC.rom}</p>
                       ): produit.categorie === 'Imprimante' ? (
                        <p className="text-sm">Configutation : {produit.configImprimante.type_d_impression} / {produit.configImprimante.vitesse_impression} / {produit.configImprimante.resolution}</p>
                       ) : produit.categorie === 'Telephone' ? (
                        <p className="text-sm ">Configutation : {produit.configTelephone.processeur} / {produit.configTelephone.ram} / {produit.configTelephone.rom}</p>
                       ) :  produit.categorie === 'Imprimante' ? (
                        <p className="text-sm ">Configutation : {produit.configAccessoire.type_accessoire} / {produit.configAccessoire.compatibilite}</p>
                       ) :(
                        <p>aucunre configuration</p>
                       ) }
                      <p><span className="font-bold">Prix : </span>{produit.prix}</p>
                    </div>
                    
                    </div>
                    ))}
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
                  
                {commande.produits.map((produit, index) => (
                  <div className="mt-6">
                    <h4 className="font-bold mb-2">Produit commandé</h4>
                    
                    <div className='flex bg-gray-800 mb-6'>
                      <div className='p-4'>
                      <img src={`http://localhost:3001/uploads/${produit.photo1}`}  alt="product" className="w-20 h-20 object-cover mr-4" />
                    </div>
                    
                      
                    <div className=" p-4 rounded-lg">
                    
                      <p><span className="font-bold">Nom : </span>{produit.nom}</p>
                      <p><span className="font-bold">Référence : </span>{produit.reference}</p>
                      {produit.categorie === 'PC' && produit.configPC ? (
                          <p className="text-sm">Configutation : {produit.configPC.processeur} / {produit.configPC.ram} / {produit.configPC.rom}</p>
                       ): produit.categorie === 'Imprimante' ? (
                        <p className="text-sm">Configutation : {produit.configImprimante.type_d_impression} / {produit.configImprimante.vitesse_impression} / {produit.configImprimante.resolution}</p>
                       ) : produit.categorie === 'Telephone' ? (
                        <p className="text-sm ">Configutation : {produit.configTelephone.processeur} / {produit.configTelephone.ram} / {produit.configTelephone.rom}</p>
                       ) :  produit.categorie === 'Imprimante' ? (
                        <p className="text-sm ">Configutation : {produit.configAccessoire.type_accessoire} / {produit.configAccessoire.compatibilite}</p>
                       ) :(
                        <p>aucunre configuration</p>
                       ) }
                    </div>
                   
                    </div>
                  
                    <div className='flex justify-between'>
                    <p className='flex items-center'><span className="font-bold">Quantité :({produit.Commande_Produit.quantite}) </span><p className='ml-2 px-3 border-2 border-gray'>{}</p></p>
                    <p><span className="font-bold ">Prix : </span>{produit.prix}</p>
                    </div>
                   
                  </div>
                       ))}
              </div>
              
            )}

            {/* Reste du contenu */}
            <div className=" p-4 rounded-lg mb-0 border-b-2 border-gray" style={{backgroundColor: "#041122"}}>
              <h3 className="text-lg font-bold border-b-2 py-2 border-gray">Articles à commander ({commande.produits.length})</h3>
              {commande.produits.map((produit, index) => (
        <div key={index} className="flex justify-between items-center p-4 rounded-lg mt-4" style={{backgroundColor: "#041122"}}>
          <div className="flex items-center">
            <img 
              src={`http://localhost:3001/uploads/${produit.photo1}`} 
              alt={produit.nom} 
              className="w-20 h-20 object-cover mr-4" 
            />
            <div>
              <h4 className="font-bold">{produit.nom}</h4>
              {produit.categorie === 'PC' && produit.configPC ? (
                          <p className="text-sm">{produit.configPC.processeur} / {produit.configPC.ram} / {produit.configPC.rom}</p>
                       ): produit.categorie === 'Imprimante' ? (
                        <p className="text-sm">{produit.configImprimante.type_d_impression} / {produit.configImprimante.vitesse_impression} / {produit.configImprimante.resolution}</p>
                       ) : produit.categorie === 'Telephone' ? (
                        <p className="text-sm">{produit.configTelephone.processeur} / {produit.configTelephone.ram} / {produit.configTelephone.rom}</p>
                       ) :  produit.categorie === 'Imprimante' ? (
                        <p className="text-sm">{produit.configAccessoire.type_accessoire} / {produit.configAccessoire.compatibilite}</p>
                       ) :(
                        <p>aucunre configuration</p>
                       ) }
              <p className="text-sm">Référence: {produit.reference}</p>
              <p className="text-sm">Quantité commandée: ({produit.Commande_Produit.quantite})</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold">Prix: {produit.prix} MGA</p>
           
            <p className="text-sm">Sous-Total:  {produit.prix * produit.Commande_Produit.quantite}</p>
          </div>
        </div>
      ))}
            </div>

            {/* Résumé total */}
            <div className="flex justify-between items-center  p-4 rounded-lg mb-6" style={{backgroundColor: "#041122"}}>
              <div></div>
              <div className="text-right">
           
              <p className="text-sm font-bold">Reste a payer: {commande.total - commande.paiement?.montant}</p>
         
                <p className="text-lg font-bold text-right">Total : {commande.total} MGA</p>
              </div>
            </div>

            {/* Informations Client et Commande */}
            <div className="grid grid-cols-2 gap-4">
              <div className=" p-4 rounded-lg" style={{backgroundColor: "#041122"}}>
                <h4 className="font-bold">Client</h4>
                <p className="text-sm">{commande.client.nomCli}</p>
                <p className="text-sm">{commande.client.emailCli}</p><br />
                <p className="text-xl">Adresse du client</p>
                <p className="text-sm">{commande.client.adresseCli}</p>
                <p className="text-sm">{commande.client.telCli}</p>
              </div>

              <div className=" p-4 rounded-lg" style={{backgroundColor: "#041122"}}>
                <h4 className="font-bold">Informations sur la commande</h4>
                <p className="text-sm">{new Date(commande.date_commande).toLocaleString()}</p>
                <p className="text-sm">Statut: {commande.statut}</p>
                <p className="flex text-sm">Numéro de commande: <p className=' text-blue-600 ml-4'>#{commande.idCommande}</p></p>
              </div>
              <div className=" p-4 rounded-lg" style={{backgroundColor: "#041122"}}>
                <h4 className="font-bold">Facture (0)</h4>
                <p className="text-sm">Aucune facture trouvée</p>
              </div>

              <div className=" p-4 rounded-lg" style={{backgroundColor: "#041122"}}>
                <h4 className="font-bold">Expéditions (0)</h4>
                <Link to={`/infoLivraison/${livraison.idLivraison}`}>
                <p className="text-sm text-blue-800 cursor-pointer py-4 ml-3">Voir</p>
                </Link>
                
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

