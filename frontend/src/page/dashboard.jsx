import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import Header from '../composant/Header/header';
import Sidebar from '../composant/sidebar/sidebar';
import { Line, Bar, Doughnut} from 'react-chartjs-2';
import { Chart as chartjs, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
import { FaAngleLeft, FaAngleRight, FaChartLine,  FaEye, FaShoppingCart, FaUser } from 'react-icons/fa';


chartjs.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement)
const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    totalRevenue: '',
    totalOrders: '',
    totalClient: '',
    totalVisitor: ''
  });
  const getDayByMonth = (month, year) => {
    const dayIsMonth = [];
    const date = new Date(year, month, 1);

    while(date.getMonth() === month) {
      dayIsMonth.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return dayIsMonth;
  }


  useEffect(() => {
    const fetchCard = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/api/stat/stats' , {
        headers: { 'Authorization': `Bearer ${token}` }
      });
        setStats(response.data);
        console.log(response);
        console.log('ito',response.data)
      
      }catch (error) {
        console.error('erreur lors de la recuperation des stat des cartes', error)
      }
      
    };
    fetchCard();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const [salesData, setSalesData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Analyse des ventes ce mois-ci',
        data: [],
        borderColor: 'rgba(255, 0, 23, 1)',
        backgroundColor: 'rgba(255, 0, 23, 0.5)',
        fill: true,
        tension: 0.4,
      },
    ],
  });

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/api/stat/sales/monthlty' , {
          headers: { 'Authorization': `Bearer ${token}` }
        }); // Remplace l'endpoint par le bon si nécessaire
        const sales = response.data;

              // Récupérer l'année et le mois actuels
              const now = new Date();
              const year = now.getFullYear();
              const month = now.getMonth();
              const today = now.getDate();
      
              // Obtenir tous les jours du mois actuel
              const allDaysInMonth = getDayByMonth(month, year);
      
              // Transformer les ventes pour une utilisation facile
              const salesByDate = sales.reduce((acc, sale) => {
                const saleDate = new Date(sale.jour).getDate();  // Obtenir le jour
                acc[saleDate] = parseFloat(sale.totalVente);  // Associer le jour avec le total des ventes
                return acc;
              }, {});
      
              // Créer les labels (jours) et les données (ventes) en complétant les jours sans ventes
              const labels = allDaysInMonth .filter((day) => day.getDate() <= today) // Limiter aux jours jusqu'à aujourd'hui 
              .map((day) => dayjs(day).format("D")); 
              const data = allDaysInMonth .filter((day) => day.getDate() <= today) // Limiter aux jours jusqu'à aujourd'hui 
              .map((day) => salesByDate[day.getDate()] || 0); // Ventes ou 0 si pas de vente 

        console.log(data)

        setSalesData({
          labels,
          datasets: [
            {
              ...salesData.datasets[0],
              data,  // Mettre à jour les données des ventes
            },
          ],
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
      }
    };
    console.log('salesdate',setSalesData)

    fetchSalesData();
  }, []);


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
    labels: ['1', '2', '3', '4'],
    datasets: [
      {
        label: 'clients',
        data: [1,2,1,1],
        backgroundColor: 'rgba(250, 0, 13, 1)',
        borderWidth: 2,
      },
    ],
  };



  
  const topCategories = [
    { category: 'PC', sales: 100 },
    { category: 'Phone', sales: 1 },
    { category: 'Printer', sales: 15 },
    { category: 'Accessory', sales: 1 },
  ];
  
  const recurrentCustomers = { recurrent: 70, new: 30 };
  
  const recentOrders = [
    { orderId: 1, customer: 'Sarobidy', total: 150 },
    { orderId: 2, customer: 'Faniry', total: 200 },
    { orderId: 3, customer: 'hanitriniaina', total: 250 },
    { orderId: 4, customer: 'Maminiaina', total: 300 },
    { orderId: 5, customer: 'fanomezantsoa', total: 300 },
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
      <div className="h-screen flex flex-col bleu_background" >
        {/* Header fixé en haut */}
        <Header toggleSidebar={toggleSidebar} />
        <div className="flex">
          {/* Sidebar à gauche */}
          <Sidebar isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar} />
          {/* Contenu principal avec scrollbar */}
          <div className="flex-1 overflow-y-auto p-6 pt-20 pl-64 ml-6 bleu_background" >
            <h1 className="text-2xl text-white font-semibold mb-6">BONJOUR, Utilisateur</h1>
  
            {/* Cartes d'informations */}
            <div className="grid grid-cols-4 gap-3 mb-4">
                    <div className="relative p-4 rounded-xl shadow-2xl text-white border-b-2 border-black bleu_background" style={{backgroundColor: "#041122"}}>
                          <div className="flex flex-col">
                              <p className="text-gray-400">Revenu total</p>
                              <p className="text-sm text-gray-500">Ce mois ci</p>
                              <h3 className="text-2xl font-bold mt-5">{stats.totalRevenue} MGA</h3>
                          </div>
                          {/* Icône en haut à droite */}
                          <div className="absolute top-4 right-4 rounded-full bg-gray-600 p-1 shadow-l bleu_backgroundg" style={{ backgroundColor: "#030C1B" }}>
                            <FaChartLine className="text-red-600 text-lg" />
                          </div>
                    </div>

                    <div className="relative bg-gray-900 p-4 rounded-xl shadow-md text-white border-b-2 border-black" style={{backgroundColor: "#041122"}}>
                          <div className="flex flex-col">
                              <p className="text-gray-400">Commande totale</p>
                              <p className="text-sm text-gray-500">Ce mois ci</p>
                              <h3 className="text-2xl font-bold mt-5">{stats.totalOrders}</h3>
                          </div>
                          {/* Icône en haut à droite */}
                          <div className="absolute top-4 right-4 rounded-full bg-gray-600 p-1 shadow-l bleu_backgroundg"style={{ backgroundColor: "#030C1B" }} >
                            <FaShoppingCart className="text-red-600 text-lg" />
                          </div>
                    </div>

                    <div className="relative bg-gray-900 p-4 rounded-xl shadow-md text-white border-b-2 border-black" style={{backgroundColor: "#041122"}}>
                          <div className="flex flex-col">
                              <p className="text-gray-400">Client totale</p>
                              <p className="text-sm text-gray-500 ">Ce mois ci</p>
                              <h3 className="text-2xl font-bold mt-5">{stats.totalClient}</h3>
                          </div>
                          {/* Icône en haut à droite */}
                          <div className="absolute top-4 right-4 rounded-full bg-gray-600 p-1 shadow-l bleu_backgroundg"style={{ backgroundColor: "#030C1B" }} >
                            <FaUser className="text-red-600 text-lg" />
                          </div>
                    </div>

                    <div className="relative bg-gray-900 p-4 rounded-xl shadow-md text-white border-b-2 border-black" style={{backgroundColor: "#041122"}}>
                          <div className="flex flex-col">
                              <p className="text-gray-400">Visiteur totale</p>
                              <p className="text-sm text-gray-500">Ce mois ci</p>
                              <h3 className="text-2xl font-bold mt-5">{stats.totalVisitor}</h3>
                          </div>
                          {/* Icône en haut à droite */}
                          <div className="absolute top-4 right-4 rounded-full bg-gray-600 p-1 shadow-l bleu_backgroundg"style={{ backgroundColor: "#030C1B" }} >
                            <FaEye className="text-red-600 text-lg" />
                          </div>
                    </div>
            </div>
  
            {/* Analyse des ventes */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-6 rounded-xl shadow-md" style={{backgroundColor: "#041122"}}>
                <div className='flex justify-between text-white'>
                <h3 className="text-xl font-semibold mb-4">Analyse des ventes</h3>
                <h6 className="flex items-center font-semibold mb-4 cursor-pointer p-1 shadow-lg"><p className='rounded-lg bg-gray-800 px-2'>Cette mois</p>< FaAngleLeft className='ml-4 text-2xl'/><FaAngleRight className='ml-4 text-2xl'/></h6>
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
  <div className="w-1/3 ml-12 bg-gray-800 p-12 rounded-md h-full flex flex-col justify-center"style={{backgroundColor: "#041122"}}>
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
              <div className='p-2 rounded-lg font-semibold cursor-pointe bleu_backgroundr'><h6>Voir tout</h6></div>    
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