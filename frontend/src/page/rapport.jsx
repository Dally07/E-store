import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import Header from '../composant/Header/header';
import Sidebar from '../composant/sidebar/sidebar';
import 'chart.js/auto';
import { FaMoneyBillWave, FaShoppingCart, FaUser,FaUserCircle, FaStar } from 'react-icons/fa';

const Rapport = () => {
  // État pour la date sélectionnée
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());

  // Données statiques pour simuler une réponse API
  const [rapport, setRapport] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalClient: 0,
    revenues: [],
    productsSold: [],
    paymentMethods: [],
    popularProduct: null,
    bestClient: null
  })

  // Fonction pour récupérer les données du rapport
  const fetchRapportData = async () => {
    try {
      const token = localStorage.getItem('token');
      const [venteResponse, produitsResponse, paiementResponse, clientResponse] = await Promise.all([
        axios.get(`http://localhost:3001/api/rapport-journalier?day=${selectedDate}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        axios.get(`http://localhost:3001/api/rapport-journalier/statProd?day=${selectedDate}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        axios.get(`http://localhost:3001/api/rapport-journalier/paiement?day=${selectedDate}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        axios.get(`http://localhost:3001/api/rapport-journalier/topPoduct?day=${selectedDate}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        
      ]);

      // Combiner les données reçues
      const data = {
        totalOrders: venteResponse.data.totalOrders || 0,
        totalRevenue: venteResponse.data.totalRevenue || 0,
        totalClient: venteResponse.data.totalClient || 0,
        productsSold: produitsResponse.data.categorieCount || {}, // Ajustez si nécessaire
        paymentMethods: paiementResponse.data.categorieCount || {},
        popularProduct: produitsResponse.data.popularProduct || null, // Ajustez en fonction de votre réponse
        bestClient: clientResponse.data.meilleur_client || null,
      };

      setRapport(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données du rapport:', error);

      setRapport({
        totalOrders: 0,
        totalRevenue: 0,
        totalClient: 0,
        productsSold: {},
        paymentMethods: {},
        popularProduct: null,
        bestClient: null
      });
    }
  };

  useEffect(() => {
    fetchRapportData();
  }, [selectedDate]); 


  const dataProduits = {
    labels: Object.keys(rapport.productsSold),
    datasets: [
      {
        label: 'Produits vendus',
        data:  Object.values(rapport.productsSold),
        backgroundColor: [
          'rgba(78, 178, 88, 0.8)', // Vert transparent
          'rgba(237, 85, 101, 0.8)', // Rose transparent
          'rgba(251, 189, 8, 0.8)', // Jaune transparent
          'rgba(54, 162, 235, 0.8)', // Bleu transparent
        ],
        borderColor: [
          'rgba(78, 178, 88, 1)',
          'rgba(237, 85, 101, 1)',
          'rgba(251, 189, 8, 1)',
          'rgba(63, 138, 215, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const dataPaiement = {
    labels: Object.keys(rapport.paymentMethods),
    datasets: [
      {
        label: 'Modes de paiement',
        data:  Object.values(rapport.paymentMethods),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)', // Rouge doux
          'rgba(54, 162, 235, 0.6)', // Bleu doux
          'rgba(255, 206, 86, 0.6)', // Jaune doux
        ],
        borderColor: [
          'rgba(255, 69, 0, 1)',
          'rgba(50, 205, 50, 1)',
          'rgba(255, 215, 0, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: '#030C1B' }}>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 overflow-y-auto p-6 pt-20 pl-64 ml-6 mb-6" style={{ backgroundColor: '#030C1B' }}>
          <h2 className="text-2xl font-bold text-white mb-6">Rapport Journalier</h2>

          {/* Sélecteur de date */}
          <div className="mb-6">
            <label className="text-white">Sélectionnez une date :</label>
            <input
              type="date"
              className="ml-4 p-2 rounded bg-gray-800 text-white"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
            />
          </div>
          

          <div className="grid grid-cols-3 gap-6 mb-6">
            {/* Total des commandes */}
            <div className="p-6 rounded-lg shadow-xl transition-shadow duration-300 bordered-b" style={{ backgroundColor: '#041122' }}>
              <div className='flex justify-between items-center'>
              <h3 className="text-white text-xl font-bold">Total des Commandes</h3>
                    <FaShoppingCart className='text-3xl rounded-full text-red-700 mr-4 rounded-xl p-1' style={{backgroundColor: "#030C1B"}}/>
              </div>
              
              <p className="text-xl text-gray-300 mt-2">{rapport.totalOrders}</p>
            </div>

            {/* Revenu total */}
            <div className="p-6 rounded-lg shadow-xl transition-shadow duration-300 bordered-b" style={{ backgroundColor: '#041122' }}>
              <div className='flex justify-between items-center'>
              <h3 className="text-white text-xl font-bold">Revenu Total</h3>
                <FaMoneyBillWave className='text-3xl rounded-full text-red-700 mr-4 rounded-xl p-1' style={{backgroundColor: "#030C1B"}}/>
              </div>

              <p className="text-xl text-gray-300 mt-2">{rapport.totalRevenue} MGA</p>
            </div>
            {/* client commande */}
            <div className="p-6 rounded-lg shadow-xl transition-shadow duration-300 bordered-b" style={{ backgroundColor: '#041122' }}>
              <div className='flex justify-between items-center'>
              <h3 className="text-white text-xl font-bold">Client Commander</h3>
              <FaUser className='text-3xl rounded-full text-red-700 mr-4 rounded-xl p-1' style={{backgroundColor: "#030C1B"}} />
              </div>
              
              <p className="text-xl text-gray-300 mt-2">{rapport.totalClient}</p>
            </div>
          </div>
          <div className="mb-6">
  {/* Client le plus important avec style VIP */}
  {rapport.bestClient && (
    <div className="p-6 rounded-lg mt-6 shadow-lg flex items-center space-x-4" style={{ backgroundColor: '#041122' }}>
      <FaUserCircle className="text-5xl text-yellow-300" />
      <div>
        <h3 className="text-yellow-300 font-bold mb-1">Client VIP</h3>
        <p className="text-2xl text-white font-bold mb-1">{rapport.bestClient.nom}</p>
        <p className="text-gray-400">{rapport.bestClient.email || "Aucune donnée trouvée"}</p>

        {/* Section des étoiles */}
        <div className="flex mt-2">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-yellow-500 text-lg animate-pulse mr-1" />
          ))}
        </div>
      </div>
    </div>
  )}
</div>

          <div className="grid grid-cols-2 gap-6">
            {/* Répartition des produits vendus */}
            <div className="p-6 rounded-lg" style={{ backgroundColor: '#041122' }}>
              <h3 className="text-white font-bold mb-4">Répartition des Produits Vendus</h3>
              <Pie data={dataProduits} />
            </div>

            {/* Méthodes de paiement */}
            <div className="p-6 rounded-lg" style={{ backgroundColor: '#041122' }}>
              <h3 className="text-white font-bold mb-4">Méthodes de Paiement</h3>
              <Pie data={dataPaiement} />
            </div>
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default Rapport;