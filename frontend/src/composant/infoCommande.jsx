import React from 'react';
import Header from '../Header/header';
import Sidebar from '../sidebar/sidebar';
import { FaFileInvoice, FaTimes, FaTruck } from 'react-icons/fa';

const InfoCommande = () => {

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
                    <h2 className="text-2xl font-bold">Commande n°24</h2>
                  </div>
                  <div className="bg-green-600 text-white rounded ml-4">
                    <span className="px-1 text-center">En cours</span>
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
                  <FaTruck className='items-center'/> <span className='ml-2'>Livrer</span>
                </button>
                <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg"style={{backgroundColor: "#041122"}}>
                  <FaFileInvoice className='items-center'/><span className='ml-2'>Facture</span> 
                </button>
                <button className="flex items-center px-4 py-2 text-white rounded-lg"style={{backgroundColor: "#041122"}}>
                  <FaTimes className='items-center'/><span className='ml-2'>Annuler</span>
                </button>
              </div>
              
            </div>

            {/* Articles à commander */}
            <div className=" p-4 rounded-lg mb-0 border-b-2 border-gray" style={{backgroundColor: "#041122"}}>
              <h3 className="text-lg font-bold border-b-2 py-2 border-gray">Articles à commander (1)</h3>
              <div className="flex justify-between items-center p-4 rounded-lg mt-4" style={{backgroundColor: "#041122"}}>
                <div className="flex items-center">
                  <img src="/path-to-image" alt="product" className="w-20 h-20 object-cover mr-4" />
                  <div>
                    <h4 className="font-bold">Acer Nitro 5</h4>
                    <p className="text-sm">Intel® Core™ i5 6th Gen Intel® HD Graphics 620 8GB and 256GB SSD</p>
                    <p className="text-sm">Référence</p>
                    <p className="text-sm">Commander (1)</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">Prix: 3.500.000MGA</p>
                  <p className="text-sm">Taxe (%) : 0 MGA</p>
                  <p className="text-sm">Sous-Total : 3.500.000MGA</p>
                </div>
              </div>
            </div>

            {/* Résumé total */}
            <div className="flex justify-between items-center  p-4 rounded-lg mb-6" style={{backgroundColor: "#041122"}}>
                <div></div>
              <div className="text-right">
              <p className="text-sm text-right">Sous-Total : 3.500.000 MGA</p>
              <p className="text-sm text-right">Impot : 0 MGA</p>
            <p className="text-lg font-bold text-right">Total : 3.500.000 MGA</p>
              </div>
            </div>

            {/* Informations Client et Commande */}
            <div className="grid grid-cols-2 gap-4">
              <div className=" p-4 rounded-lg" style={{backgroundColor: "#041122"}}>
                <h4 className="font-bold">Client</h4>
                <p className="text-sm">Antsatiana</p>
                <p className="text-sm">antsatiana@gmail.com</p><br />
                <p className="text-xl">Adresse du client</p>
                <p className="text-sm">Soanierana Fianarantsoa 301</p>
                <p className="text-sm">+261 345269802</p>
              </div>

              <div className=" p-4 rounded-lg" style={{backgroundColor: "#041122"}}>
                <h4 className="font-bold">Informations sur la commande</h4>
                <p className="text-sm">Date de commande: 12-08-2024 14:15:25</p>
                <p className="text-sm">Statut de commande: En attente</p>
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
