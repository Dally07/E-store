import React, { useState } from 'react';
import Header from '../composant/Header/header';
import Sidebar from '../composant/sidebar/sidebar';
import { Line, Bar, Doughnut} from 'react-chartjs-2';
import { Chart as chartjs, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
import { FaChartLine,  FaEye, FaShoppingCart, FaUser } from 'react-icons/fa';


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
        label: 'Analyse des ventes cette année',
        data: [30, 45, 60, 40, 80, 60, 75, 55, 100, 70, 95, 50],
        borderColor: 'rgba(255, 0, 23, 1)',  // Bordure rouge vif
        backgroundColor: 'rgba(255, 0, 23, 0.5)',  // Rouge avec transparence
        fill: true,  // Remplissage sous la ligne
        tension: 0.4,  // Pour une courbe lisse
      },
    ],
  };

  // Options du graphique pour le design et l'apparence
  const options = {
    scales: {
      x: {
        ticks: { color: '#fff' }, // Couleur des labels (mois) en blanc
        grid: { display: false }, // Désactivation des lignes de la grille pour l'axe x
      },
      y: {
        ticks: { color: '#fff' }, // Couleur des valeurs de l'axe y en blanc
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Lignes de la grille y en blanc légèrement visible
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#fff', // Couleur des labels de la légende en blanc
        },
      },
    },
  };


  const clientsData = {
    labels: ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'],
    datasets: [
      {
        label: 'clients',
        data: [15,20,35,10,30,45,56,25,45,65,55,45,14,25,24,33,34,26,20,25,14,25,14,23,14,58,65,49,58,65,75],
        backgroundColor: 'rgba(250, 0, 13, 1)',
        borderWidth: 2,
      },
    ],
  };



  
  const topCategories = [
    { category: 'PC', sales: 400 },
    { category: 'Phone', sales: 300 },
    { category: 'Printer', sales: 200 },
    { category: 'Accessory', sales: 100 },
  ];
  
  const recurrentCustomers = { recurrent: 70, new: 30 };
  
  const recentOrders = [
    { orderId: 1, customer: 'John Doe', total: 150 },
    { orderId: 2, customer: 'Jane Smith', total: 200 },
    { orderId: 3, customer: 'Alice Johnson', total: 250 },
    { orderId: 4, customer: 'Bob Brown', total: 300 },
    { orderId: 5, customer: 'Bob Brown', total: 300 },
    { orderId: 6, customer: 'Bob Brown', total: 300 },
    { orderId: 7, customer: 'Bob Brown', total: 300 },
  ];

  const data = {
    labels: topCategories.map((category) => category.category),
    datasets: [
      {
        label: 'Sales by Category',
        data: topCategories.map((category) => category.sales),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

    return (
      <div className="h-screen flex flex-col" style={{backgroundColor: "#030C1B"}}>
        {/* Header fixé en haut */}
        <Header toggleSidebar={toggleSidebar} />
        <div className="flex">
          {/* Sidebar à gauche */}
          <Sidebar isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar} />
          {/* Contenu principal avec scrollbar */}
          <div className="flex-1 overflow-y-auto p-6 pt-20 pl-64 ml-6" style={{backgroundColor: "#030C1B"}}>
            <h1 className="text-2xl text-white font-semibold mb-6">BONJOUR, Utilisateur</h1>
  
            {/* Cartes d'informations */}
            <div className="grid grid-cols-4 gap-3 mb-4">
                    <div className="relative bg-gray-900 p-4 rounded-xl shadow-2xl text-white border-b-2 border-black" style={{backgroundColor: "#041122"}}>
                          <div className="flex flex-col">
                              <p className="text-gray-400">Revenu total</p>
                              <p className="text-sm text-gray-500">Ce mois ci</p>
                              <h3 className="text-2xl font-bold mt-5">120,350,000 MGA</h3>
                          </div>
                          {/* Icône en haut à droite */}
                          <div className="absolute top-4 right-4 rounded-full bg-gray-600 p-1 shadow-lg"style={{backgroundColor: "#030C1B"}} >
                            <FaChartLine className="text-red-600 text-lg" />
                          </div>
                    </div>

                    <div className="relative bg-gray-900 p-4 rounded-xl shadow-md text-white border-b-2 border-black" style={{backgroundColor: "#041122"}}>
                          <div className="flex flex-col">
                              <p className="text-gray-400">Commande totale</p>
                              <p className="text-sm text-gray-500">Ce mois ci</p>
                              <h3 className="text-2xl font-bold mt-5">1452</h3>
                          </div>
                          {/* Icône en haut à droite */}
                          <div className="absolute top-4 right-4 rounded-full bg-gray-600 p-1 shadow-lg"style={{backgroundColor: "#030C1B"}} >
                            <FaShoppingCart className="text-red-600 text-lg" />
                          </div>
                    </div>

                    <div className="relative bg-gray-900 p-4 rounded-xl shadow-md text-white border-b-2 border-black" style={{backgroundColor: "#041122"}}>
                          <div className="flex flex-col">
                              <p className="text-gray-400">Client totale</p>
                              <p className="text-sm text-gray-500 ">Ce mois ci</p>
                              <h3 className="text-2xl font-bold mt-5">1920</h3>
                          </div>
                          {/* Icône en haut à droite */}
                          <div className="absolute top-4 right-4 rounded-full bg-gray-600 p-1 shadow-lg"style={{backgroundColor: "#030C1B"}} >
                            <FaUser className="text-red-600 text-lg" />
                          </div>
                    </div>

                    <div className="relative bg-gray-900 p-4 rounded-xl shadow-md text-white border-b-2 border-black" style={{backgroundColor: "#041122"}}>
                          <div className="flex flex-col">
                              <p className="text-gray-400">Visiteur totale</p>
                              <p className="text-sm text-gray-500">Ce mois ci</p>
                              <h3 className="text-2xl font-bold mt-5">17</h3>
                          </div>
                          {/* Icône en haut à droite */}
                          <div className="absolute top-4 right-4 rounded-full bg-gray-600 p-1 shadow-lg"style={{backgroundColor: "#030C1B"}} >
                            <FaEye className="text-red-600 text-lg" />
                          </div>
                    </div>
            </div>
  
            {/* Analyse des ventes */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-6 rounded-xl shadow-md" style={{backgroundColor: "#041122"}}>
                <div className='flex justify-between text-white'>
                <h3 className="text-xl font-semibold mb-4">Analyse des ventes</h3>
                <h6 className=" font-semibold mb-4 cursor-pointer p-1 shadow-lg">Cette annee</h6>
                </div>
                    <Line data={salesData} options={options} />
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md" style={{backgroundColor: "#041122"}}>
                <div className='flex justify-between text-white'>
                <h3 className="text-xl font-semibold mb-4">Analyse des Clients</h3>
                <h6 className="flex justify-between cursor-pointer font-semibold mb-4">Cette mois</h6>
                </div>
                    <Bar  data={clientsData} />
                </div>
            </div>

7
      

      {/* Top Product Categories */}
      <div className="flex justify-between mb-6 text-white items-stretch">
  {/* Section for Recent Orders and Customers Analysis */}
  <div className="w-2/3 mb-4 bg-gray-800 p-4 rounded-md h-full" style={{backgroundColor: "#041122"}}>
    <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
    <table className="min-w-full">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Order ID</th>
          <th className="py-2 px-4 border-b">Customer</th>
          <th className="py-2 px-4 border-b">Total</th>
        </tr>
      </thead>
      <tbody>
        {recentOrders.map((order) => (
          <tr key={order.orderId} className="hover:bg-gray-100">
            <td className="py-2 px-4 border-b">{order.orderId}</td>
            <td className="py-2 px-4 border-b">{order.customer}</td>
            <td className="py-2 px-4 border-b">{order.total} MGA</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Section for Doughnut Chart */}
  <div className="w-1/3 ml-12 bg-gray-800 p-6 rounded-md h-full flex flex-col justify-center"style={{backgroundColor: "#041122"}}>
    <h2 className="text-xl font-bold mb-4">Top Categories</h2>
    <div className="h-auto flex items-center justify-center">
      <Doughnut data={data} />
    </div>
  </div>
</div>


      

      {/* Recent Orders */}
      


            <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white text-white p-4 rounded-md" style={{backgroundColor: "#041122"}}>
            <div className='flex justify-between'>
              <div><h3 className="text-xl font-semibold mb-4">Commande recente</h3></div>
              <div className='p-2 rounded-lg font-semibold cursor-pointer'style={{backgroundColor: "#030C1B"}}><h6>Voir tout</h6></div>    
            </div>
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



            <div className="bg-white text-white p-4 rounded-md shadow-md" style={{backgroundColor: "#041122"}}>
                <div className='flex justify-between'>
                <h3 className="text-xl font-semibold mb-4">Stock en Critique</h3>
                <h6 className=" font-semibold mb-4 cursor-pointer">Voir tout</h6>
                </div>
                <div className='flex w-full border-2 border-black-900 rounded-lg justify-between '>
                      <div className='p-4'>
                      <img src="/path-to-image" alt="product" className="w-20 h-20 object-cover mr-4" />
                    </div>
                      
                    <div className=" p-4 rounded-lg">
                      <p><span className="font-bold"></span>Asus ROG</p>
                      <p><span className="font-bold"></span>AS-214</p>
                      <p><span className="font-bold"></span>Intel® Core™ i5 8th Gen</p>
                      <p><span className="font-bold"></span>8GB/256GB SSD</p>
                    </div>

                    <div className=" p-4 text-center text-2xl rounded-lg">
                      <p className='text-2xl text-center'><span className="font-bold text-center text-red-700 text-2xl">5</span></p>
                    </div>

                </div>
            </div>
              
              
    </div>
    </div>
            {/* Commandes récentes */}
            


          </div>
        </div>
      
    );
  };
  
  export default Dashboard;