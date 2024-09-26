import React from 'react';
import Header from '../composant/Header/header';
import Sidebar from '../composant/sidebar/sidebar';
import { FaPrint, FaVoicemail } from 'react-icons/fa';

const InfoFacture = () => {

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
                    <h2 className="text-2xl font-bold">Facure n°14</h2>
                  </div>
                  <div className="bg-green-600 text-white rounded ml-4">
                    <span className="px-1 text-center">Payer</span>
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
              <h3 className="text-lg font-bold border-b-2 py-2 border-gray">Element du facture (1)</h3>
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
                <h4 className="font-bold mb-4">Informations sur la commande</h4>
                <p className="text-sm">ID de la commande: <strong className='text-blue-500 ml-8'>#25</strong></p>
                <p className="text-sm">Date de la commande: <strong className='ml-4'>12-08-2024 14:15:25</strong></p>
                <p className="text-sm">Statut de la commande: <strong className='ml-3'>Livrer</strong> </p>
                <p className="text-sm">Statut de la facture: <strong className='ml-10'>Payer</strong> </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoFacture;
