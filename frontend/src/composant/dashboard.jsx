import React, { useState } from 'react';
import Header from '../Header/header';
import Sidebar from '../sidebar/sidebar';
import { Line, Bar} from 'react-chartjs-2';
import { Chart as chartjs, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
import { FaChartLine, FaEye, FaShoppingCart, FaUser } from 'react-icons/fa';


chartjs.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement)
const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const salesData = {
    labels: ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
    datasets: [
      {
        label: 'Vente',
        data: [30,45,60,40,80,60,75,55,100,70,95,50],
        borderColor: 'rgba(255, 0, 13, 1)',
        backgroundColor: 'rgba(250, 0, 13, 1)',
        fill: true,
        tension: 0.4,
    },
  ],
  };

  const clientsData = {
    labels: ['lun', 'mar', 'mer', 'jeu', 'ven', 'sam', 'dim'],
    datasets: [
      {
        label: 'clients',
        data: [15,20,35,10,30,45,5],
        backgroundColor: 'rgba(250, 0, 13, 1)',
        borderWidth: 2,
      },
    ],
  };


    return (
      <div className="h-screen flex flex-col">
        {/* Header fixé en haut */}
        <Header toggleSidebar={toggleSidebar} />
        <div className="flex flex-1">
          {/* Sidebar à gauche */}
          <Sidebar isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar} />
          {/* Contenu principal avec scrollbar */}
          <div className="flex-1 overflow-y-auto bg-gray-700 p-6" style={{backgroundColor: "#030C1B"}}>
            <h1 className="text-2xl text-white font-semibold mb-6">BONJOUR, Utilisateur</h1>
  
            {/* Cartes d'informations */}
            <div className="grid grid-cols-4 gap-3 mb-4">
                    <div className="relative bg-gray-900 p-4 rounded-lg shadow-md text-white" style={{backgroundColor: "#041122"}}>
                          <div className="flex flex-col">
                              <p className="text-gray-400">Revenu total</p>
                              <p className="text-sm text-gray-500 mt-1">Ce mois ci</p>
                              <h3 className="text-2xl font-bold mt-4">120,350,000 MGA</h3>
                          </div>
                          {/* Icône en haut à droite */}
                          <div className="absolute top-4 right-4 rounded-full bg-gray-600 p-2 shadow-lg"style={{backgroundColor: "#030C1B"}} >
                            <FaChartLine className="text-red-600 text-2xl" />
                          </div>
                    </div>

                    <div className="relative bg-gray-900 p-4 rounded-lg shadow-md text-white" style={{backgroundColor: "#041122"}}>
                          <div className="flex flex-col">
                              <p className="text-gray-400">Commande totale</p>
                              <p className="text-sm text-gray-500 mt-1">Ce mois ci</p>
                              <h3 className="text-2xl font-bold mt-4">1452</h3>
                          </div>
                          {/* Icône en haut à droite */}
                          <div className="absolute top-4 right-4 rounded-full bg-gray-600 p-2 shadow-lg"style={{backgroundColor: "#030C1B"}} >
                            <FaShoppingCart className="text-red-600 text-2xl" />
                          </div>
                    </div>

                    <div className="relative bg-gray-900 p-4 rounded-lg shadow-md text-white" style={{backgroundColor: "#041122"}}>
                          <div className="flex flex-col">
                              <p className="text-gray-400">Client totale</p>
                              <p className="text-sm text-gray-500 mt-1">Ce mois ci</p>
                              <h3 className="text-2xl font-bold mt-4">1920</h3>
                          </div>
                          {/* Icône en haut à droite */}
                          <div className="absolute top-4 right-4 rounded-full bg-gray-600 p-2 shadow-lg"style={{backgroundColor: "#030C1B"}} >
                            <FaUser className="text-red-600 text-2xl" />
                          </div>
                    </div>

                    <div className="relative bg-gray-900 p-4 rounded-lg shadow-md text-white" style={{backgroundColor: "#041122"}}>
                          <div className="flex flex-col">
                              <p className="text-gray-400">Visiteur totale</p>
                              <p className="text-sm text-gray-500 mt-1">Ce mois ci</p>
                              <h3 className="text-2xl font-bold mt-4">17</h3>
                          </div>
                          {/* Icône en haut à droite */}
                          <div className="absolute top-4 right-4 rounded-full bg-gray-600 p-2 shadow-lg"style={{backgroundColor: "#030C1B"}} >
                            <FaEye className="text-red-600 text-2xl" />
                          </div>
                    </div>
            </div>
  
            {/* Analyse des ventes */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-6 rounded-md shadow-md" style={{backgroundColor: "#041122"}}>
                    <h3 className="text-xl text-white font-semibold mb-4">Analyse des ventes (cette année)</h3>
                    <Line data={salesData} />
                </div>
                <div className="bg-white p-6 rounded-md shadow-md" style={{backgroundColor: "#041122"}}>
                    <h3 className="text-xl text-white font-semibold mb-4">Analyse des clients (cette semaine)</h3>
                    <Bar  data={clientsData} />
                </div>
            </div>

  
            {/* Commandes récentes */}
            <div className="bg-white text-white p-6 rounded-md shadow-md" style={{backgroundColor: "#041122"}}>
              <h3 className="text-xl font-semibold mb-4">Commandes récentes</h3>
              <table className="w-full text-left text-gray">
                <thead>
                  <tr>
                    <th className="py-2">Référence</th>
                    <th className="py-2">Client</th>
                    <th className="py-2">Date</th>
                    <th className="py-2">Total</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#126548</td>
                    <td>Antsatiana</td>
                    <td>07/08/24</td>
                    <td>1,354,000 MGA</td>
                    <td className="text-red-500">En cours</td>
                  </tr>
                  {/* Ajoute d'autres lignes */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Dashboard;