import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../composant/Header/header';
import Sidebar from '../composant/sidebar/sidebar';
import { FaPrint, FaVoicemail } from 'react-icons/fa';

const InfoFacture = () => {
  const {idPaiement} = useParams();
  const [paiement, setPaiement] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchPaiement = async () => {
      try {
        setLoading(true);  // Active le mode chargement
        const response = await axios.get(`http://localhost:3001/api/paiement/${idPaiement}`);
        setPaiement(response.data); // Stocke les données dans l'état
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      } finally {
        setLoading(false); // Désactive le mode chargement
      }
    };
  
    if (idPaiement) {
      fetchPaiement();
    }
  }, [idPaiement]);

 

  if (!paiement) {
    return <p className='text-white'>chargement</p>
  }

  const client = paiement.commande?.client;

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
                    <h2 className="text-2xl font-bold">Facure n°{paiement.idPaiement}</h2>
                  </div>
                  <div className="bg-green-600 text-white rounded ml-4">
                    <span className="px-1 text-center">{paiement.statut}</span>
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
                <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg"style={{backgroundColor: "#041122"}}>
                  <FaPrint className='items-center'/> <span className='ml-2'>Imprimer</span>
                </button>
                <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg"style={{backgroundColor: "#041122"}}>
                  <FaVoicemail className='items-center'/><span className='ml-2'>Envoyer par email</span> 
                </button>
              </div>
              
            </div>

            {/* Articles à commander */}
            <div className=" p-4 rounded-lg mb-0 border-b-2 border-gray" style={{backgroundColor: "#041122"}}>
              <h3 className="text-lg font-bold border-b-2 py-2 border-gray">Element du facture ({paiement.commande.produits.length})</h3>
              {paiement.commande?.produits.map(produit => (
                   <div className="flex justify-between items-center p-4 rounded-lg mt-4" style={{backgroundColor: "#041122"}}>
                   <div className="flex items-center">
                     <img src={`http://localhost:3001/uploads/${produit.photo1}`} alt="product" className="w-20 h-20 object-cover mr-4" />
                     <div>
                       <h4 className="font-bold">{produit.nom}</h4>
                       {produit.categorie === 'PC' && produit.configPC ? (
                          <p className="text-sm">{produit.configPC.processeur},{produit.configPC.ram}, {produit.configPC.rom}</p>
                       ): produit.categorie === 'Imprimante' ? (
                        <p className="text-sm">{produit.configImprimante.type_d_impression},{produit.configImprimante.vitesse_impression}, {produit.configImprimante.resolution}</p>
                       ) : produit.categorie === 'Telephone' ? (
                        <p className="text-sm">{produit.configTelephone.processeur},{produit.configTelephone.ram}, {produit.configTelephone.rom}</p>
                       ) :  produit.categorie === 'Imprimante' ? (
                        <p className="text-sm">{produit.configAccessoire.type_accessoire},{produit.configAccessoire.compatibilite}</p>
                       ) :(
                        <p>aucunre configuration</p>
                       ) }
                       
                       <p className="text-sm">{produit.reference}</p>
                       <p className="text-sm">Commander ({produit.Commande_Produit.quantite})</p>
                     </div>
                   </div>
                   <div className="text-right">
                     <p className="text-lg font-bold">Prix: {produit.prix}MGA</p>
                    {/*<p className="text-sm">Taxe (%) : 0 MGA</p> */} 
                     <p className="text-sm">Sous-Total : {produit.Commande_Produit.prix}</p>
                   </div>
                 </div>
              ))}
             
            </div>

            {/* Résumé total */}
            <div className="flex justify-between items-center  p-4 rounded-lg mb-6" style={{backgroundColor: "#041122"}}>
                <div></div>
              <div className="text-right">
            <p className="text-lg font-bold text-right">Total : {paiement.commande.total} MGA</p>
              </div>
            </div>

            {/* Informations Client et Commande */}
            <div className="grid grid-cols-2 gap-4">
            {client ? ( 
                <div className=" p-4 rounded-lg" style={{backgroundColor: "#041122"}}>
                  <h4 className="font-bold">Client</h4>
                  <p className="text-sm">{client.nomCli}</p>
                  <p className="text-sm">{client.emailCli}</p><br />
                  <p className="text-xl">Adresse du client</p>
                  <p className="text-sm">{client.asdresseCli}</p>
                  <p className="text-sm">{client.telCli}</p>
                </div>
            ) : (
              <p>client non disponible</p>
            )}
            

              <div className=" p-4 rounded-lg" style={{backgroundColor: "#041122"}}>
                <h4 className="font-bold mb-4">Informations sur la commande</h4>
                <p className="text-sm">ID de la commande: <strong className='text-blue-500 ml-8 cursor-pointer'>#{paiement.commande_id}</strong></p>
                <p className="text-sm">Date de la commande: <strong className='ml-4'>{new Date(paiement.date_paiement).toLocaleString()}</strong></p>
                <p className="text-sm">Statut de la commande: <strong className='ml-3'>{paiement.commande.statut}</strong> </p>
                <p className="text-sm">Statut de la facture: <strong className='ml-10'>{paiement.statut}</strong> </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoFacture;
