import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import Header from '../composant/Header/header';
import Sidebar from '../composant/sidebar/sidebar';
import 'chart.js/auto';

const Rapport = () => {
  // État pour la date sélectionnée
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().substr(0, 10));

  // Données statiques pour simuler une réponse API
  const rapportData = {
    "2024-09-24": {
      totalOrders: 35,
      totalRevenue: 3500000,
      revenues: [500000, 700000, 800000, 650000, 900000, 750000, 850000],
      productsSold: [
        { nom: 'PC', totalVendus: 30, photo: 'pc_image_url', configuration: 'Core i7, 16GB RAM' },
        { nom: 'Imprimante', totalVendus: 25, photo: 'printer_image_url', configuration: '1200 dpi, 30ppm' },
        { nom: 'Accessoire', totalVendus: 45, photo: 'accessory_image_url', configuration: 'Compatible PC et téléphone' },
        { nom: 'Téléphone', totalVendus: 35, photo: 'phone_image_url', configuration: '128GB ROM, 6GB RAM' },
      ],
      paymentMethods: [45, 30, 25],
      popularProduct: { nom: 'Accessoire', totalVendus: 45, photo: 'accessory_image_url', configuration: 'Compatible PC et téléphone' },
      bestClient: { nom: 'John Doe', email: 'john.doe@example.com' }
    }
  };

  const rapport = rapportData[selectedDate] || {
    totalOrders: 0,
    totalRevenue: 0,
    revenues: [],
    productsSold: [],
    paymentMethods: [],
    popularProduct: null,
    bestClient: null
  };

  // Mise à jour des graphiques avec les données du rapport
  const dataRevenus = {
    labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
    datasets: [
      {
        label: 'Revenu quotidien (MGA)',
        data: rapport.revenues,
        backgroundColor: 'rgba(0, 191, 255, 0.5)', // Bleu transparent
        borderColor: 'rgba(0, 191, 255, 1)', // Bordure plus opaque
        borderWidth: 1,
      },
    ],
  };

  const dataProduits = {
    labels: rapport.productsSold.map(p => p.nom),
    datasets: [
      {
        label: 'Produits vendus',
        data: rapport.productsSold.map(p => p.totalVendus),
        backgroundColor: [
          'rgba(76, 175, 80, 0.5)', // Vert transparent
          'rgba(255, 99, 132, 0.5)', // Rose transparent
          'rgba(255, 206, 86, 0.5)', // Jaune transparent
          'rgba(54, 162, 235, 0.5)', // Bleu transparent
        ],
        borderColor: [
          'rgba(76, 175, 80, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const dataPaiement = {
    labels: ['Carte', 'Espèce', 'Virement'],
    datasets: [
      {
        label: 'Modes de paiement',
        data: rapport.paymentMethods,
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
            <div className="p-6 rounded-lg" style={{ backgroundColor: '#041122' }}>
              <h3 className="text-white font-bold">Total des Commandes</h3>
              <p className="text-4xl text-white mt-4">{rapport.totalOrders}</p>
            </div>

            {/* Revenu total */}
            <div className="p-6 rounded-lg" style={{ backgroundColor: '#041122' }}>
              <h3 className="text-white font-bold">Revenu Total</h3>
              <p className="text-4xl text-white mt-4">{rapport.totalRevenue} MGA</p>
            </div>
            {/* client commande */}
            <div className="p-6 rounded-lg" style={{ backgroundColor: '#041122' }}>
              <h3 className="text-white font-bold">Revenu Total</h3>
              <p className="text-4xl text-white mt-4">{rapport.totalRevenue} MGA</p>
            </div>
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

          {/* Produit le plus vendu */}
          {rapport.popularProduct && (
            <div className="p-6 rounded-lg mt-6" style={{ backgroundColor: '#041122' }}>
              <h3 className="text-white font-bold mb-4">Produit le plus vendu du jour</h3>
              <div className="flex items-center">
                <img src={rapport.popularProduct.photo} alt={rapport.popularProduct.nom} className="w-16 h-16 mr-4" />
                <div>
                  <p className="text-white font-bold">{rapport.popularProduct.nom}</p>
                  <p className="text-gray-400">{rapport.popularProduct.configuration}</p>
                </div>
              </div>
            </div>
          )}

          {/* Meilleur client */}
          {rapport.bestClient && (
            <div className="p-6 rounded-lg mt-6" style={{ backgroundColor: '#041122' }}>
              <h3 className="text-white font-bold mb-4">Client le plus important</h3>
              <div>
                <p className="text-white font-bold">{rapport.bestClient.nom}</p>
                <p className="text-gray-400">{rapport.bestClient.email}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rapport;