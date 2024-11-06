import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import Header from '../composant/Header/header';
import Sidebar from '../composant/sidebar/sidebar';
import { Line, Bar, Doughnut} from 'react-chartjs-2';
import { Chart as chartjs, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
import { FaAngleLeft, FaAngleRight, FaChartLine,  FaEye, FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';


chartjs.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement)
const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [topClients, setTopClients] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [userName, setUsername] = useState('');
  const [topCategories, setTopCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
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
  const [currentDate, setCurrentDate] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const nextMonth = () => {
    setCurrentDate((prevDate) => {
      let { month, year } = prevDate;
      if (month === 11) {
        month = 0;
        year += 1;
      } else {
        month += 1;
      }
      return {month, year};
    });
  };
  const prevMonth = () => {
    setCurrentDate((prevDate) => {
      let { month, year } = prevDate;
      if (month === 0) {
        month = 11;
        year -= 1;
      } else {
        month -= 1;
      }
      return {month, year};
    });
  };
// analyse de vente
  const [SalesData, setSalesData] = useState({
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
// analyse des clients
  const [clientsData, setClientsData] = useState({
    labels: [],
    datasets: [
      {
        label: 'clients',
        data: [],
        backgroundColor: 'rgba(250, 0, 13, 1)',
        borderWidth: 2,
      },
    ],
  });
// top categorie
const data = {
  labels: topCategories.map((category) => category.category),
  datasets: [
    {
      label: 'produit par Category',
      data: topCategories.map((category) => category.sales),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
    },
  ],
};
// username
useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken)
    setUsername(decodedToken.nom);
  }
},[]);
// api stat global
  useEffect(() => {
    const fetchCard = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3001/api/stat/stats?month=${currentDate.month}&year=${currentDate.year}` , {
        headers: { 'Authorization': `Bearer ${token}` }
      });
        setStats(response.data);
      
      }catch (error) {
        console.error('erreur lors de la recuperation des stat des cartes', error)
      }
      
    };
    fetchCard();
  }, [currentDate]);
// api analyse de vente
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3001/api/stat/sales/monthlty?month=${currentDate.month}&year=${currentDate.year}` , {
          headers: { 'Authorization': `Bearer ${token}` }
        }); // Remplace l'endpoint par le bon si nécessaire
        const sales = response.data;

              // Récupérer l'année et le mois actuels
              const now = new Date();
              const year = now.getFullYear();
              const month = now.getMonth();
              const today = now.getDate();
      
              // Obtenir tous les jours du mois actuel
              const allDaysInMonth = getDayByMonth(currentDate.month, currentDate.year);
      
              // Transformer les ventes pour une utilisation facile
              const salesByDate = sales.reduce((acc, sale) => {
                const saleDate = new Date(sale.jour).getDate();  // Obtenir le jour
                acc[saleDate] = parseFloat(sale.totalVente);  // Associer le jour avec le total des ventes
                return acc;
              }, {});
      
              // Créer les labels (jours) et les données (ventes) en complétant les jours sans ventes
              const labels = allDaysInMonth.filter((day) => day.getDate() <= today) // Limiter aux jours jusqu'à aujourd'hui 
              .map((day) => dayjs(day).format("D")); 
              const data = allDaysInMonth .filter((day) => day.getDate() <= today) // Limiter aux jours jusqu'à aujourd'hui 
              .map((day) => salesByDate[day.getDate()] || 0); // Ventes ou 0 si pas de vente 

        setSalesData((prevSalesData) => ({
          labels,
          datasets: [
            {
              ...prevSalesData.datasets[0],
              data,  // Mettre à jour les données des ventes
            },
          ],
        }));
      } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
      }
    };
    console.log('salesdate',setSalesData)

    fetchSalesData();
  }, [currentDate]);
// api analyse des clients
  useEffect(() => {
    const fetchClientsData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3001/api/stat/visitor/daily?month=${currentDate.month}&year=${currentDate.year}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const visitors = response.data;

        // Récupérer l'année et le mois actuels
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();

        // Obtenir tous les jours du mois actuel
        const allDaysInMonth = getDayByMonth(month, year);

        // Transformer les visiteurs par jour
        const visitorsByDate = visitors.reduce((acc, visitor) => {
          const visitorDate = new Date(visitor.jour).getDate(); // Obtenir le jour
          acc[visitorDate] = parseInt(visitor.totalVisiteurs, 10); // Associer le jour au nombre de visiteurs
          return acc;
        }, {});

        // Créer les labels (jours) et les données (nombre de visiteurs)
        const labels = allDaysInMonth.map((day) => dayjs(day).format('D')); // Afficher seulement le jour
        const data = allDaysInMonth.map((day) => visitorsByDate[day.getDate()] || 0); // Visiteurs ou 0 si pas de visiteurs

        // Mettre à jour les données du graphe
        setClientsData((clientsData) => ({
          labels,
          datasets: [
            {
              ...clientsData.datasets[0],
              data,
            },
          ],
        }));
      } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
      }
    };

    fetchClientsData();
  }, [currentDate]);
// api commande recente
  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/api/stat//orders/recent', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecentOrders(response.data);
        console.log('recent order', response.data)
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors de la récupération des commandes récentes :", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRecentOrders();
  }, []);
// api totale de chaque categorie
  useEffect(() => {
    const fetchTopCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/api/stat/orders/total', {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Récupérer les données de la réponse API
        const { pc, telephone, imprimante, accessoire } = response.data;

        // Mettre à jour l'état avec les données formatées
        setTopCategories([
          { category: 'PC', sales: pc },
          { category: 'Telephone', sales: telephone },
          { category: 'Imprimante', sales: imprimante },
          { category: 'Accessoire', sales: accessoire },
        ]);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
    };

    // Appeler la fonction pour charger les données
    fetchTopCategories();
  }, []);
// api top client
  useEffect(() => {
    const fetchTopClients = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/api/stat/orders/top', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTopClients(response.data); // Met à jour l'état avec les données de l'API
      } catch (error) {
        console.error('Erreur lors de la récupération des top clients:', error);
      }
    };

    fetchTopClients();
  }, []);
// api produit en rupture et en critique
  useEffect(() => {
    const fetchLowStockProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/api/stat/orders/low', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLowStockProducts(response.data); // Mettre à jour l'état avec les produits en stock critique
      } catch (error) {
        console.error('Erreur lors de la récupération des produits en stock critique:', error);
      }
    };

    fetchLowStockProducts();
  }, []); 

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
            <h1 className="text-2xl text-white font-semibold mb-6">BONJOUR,{userName}, {'\u{1F60A}'}</h1>
            <div className='flex justify-between text-white'>
            <button onClick={prevMonth}>
                < FaAngleLeft className='ml-4 mb-4 text-2xl'/>
                
                </button>
                <h2 className='flex text-white mb-6 text-xl '>
                  {dayjs(new Date(currentDate.year, currentDate.month)).format('MMMM YYYY')}
                </h2>
                <button onClick={nextMonth}>
                <FaAngleRight className='ml-4 mb-4 text-2xl'/>
                </button>
            </div>
  
            {/* Cartes d'informations */}
            <div className="grid grid-cols-4 gap-3 mb-4">
                    <div className="relative p-4 rounded-xl shadow-2xl text-white border-b-2 border-black bleu_background" style={{backgroundColor: "#041122"}}>
                          <div className="flex flex-col">
                              <p className="text-gray-400">Revenu total</p>
                              <p className="text-sm text-gray-500">Ce mois ci</p>
                              <h3 className="text-2xl text-white font-bold mt-5">{stats.totalRevenue} MGA</h3>
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
                
                </div>
                    <Line data={SalesData} options={options} />
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md" style={{backgroundColor: "#041122"}}>
                <div className='flex justify-between text-white'>
                <h3 className="text-xl font-semibold mb-4">Analyse des Clients</h3>
                </div>
                    <Bar  data={clientsData} />
                </div>
            </div>

7
      

      {/* Top Product Categories */}
      <div className="flex justify-between mb-6 text-white items-stretch">
            {/* Section for Recent Orders and Customers Analysis */}
              <div className="w-2/3 mb-4 bg-gray-800 p-4 rounded-md h-full" style={{ backgroundColor: "#041122" }}>
      <div className='flex justify-between'>
      <h2 className="text-xl font-bold mb-4">Commande recente</h2>
      <Link to="/commande">
      <h2 className="text-xl font-bold mb-4 cursor-pointer text-blue-500">voir tout</h2>
      </Link>
      
      </div>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">client ID</th>
            <th className="py-2 px-4 border-b">nom du client</th>
            <th className="py-2 px-4 border-b">Email client</th>
            <th className="py-2 px-4 border-b">Total</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Products</th>
          </tr>
        </thead>
        <tbody>
          {recentOrders.map((order) => (
            <tr key={order.idCommande} className="text-sm hover:bg-gray-900">
              <td className="py-2 px-4 border-b cursor-pointer text-blue-500"><Link to={`/infoCommande/${order.idCommande}`}>#{order.idCommande}</Link></td>
              <td className="py-2 px-4 border-b">{order.client.nomCli}</td>
              <td className="py-2 px-4 border-b">{order.client.emailCli}</td>
              <td className="py-2 px-4 border-b">{order.total} MGA</td>
              <td className="py-2 px-4 border-b">{order.statut}</td>
              <td className="py-2 px-4 border-b">
                <ul>
                  {order.produits.map((produit) => (
                    <li key={produit.idProduit}>
                      {produit.nom}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
              </div>
            {/* Section for Doughnut Chart */}
              <div className="w-1/3 mb-4 ml-12 bg-gray-800 p-4 rounded-md h-full"style={{backgroundColor: "#041122"}}>
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
              <div><h3 className="text-xl font-semibold mb-4">Client les plus de vente</h3></div>
                 
            </div>
              <table className="w-full text-left text-gray">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">ID</th>
                    <th className="py-2 px-4 border-b">Nom</th>
                    <th className="py-2 px-4 border-b">Telephone</th>
                    <th className="py-2 px-4 border-b">adresse</th>
                  
                  </tr>
                </thead>
                <tbody>
          {topClients.map((client, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">#{index + 1}</td>
              <td className="py-2 px-4 border-b">{client.nomCli}</td>
              <td className="py-2 px-4 border-b">{client.telCli}</td>
              <td className="py-2 px-4 border-b">{client.adresseCli}</td>
            </tr>
          ))}
        </tbody>
              </table>
            </div>



            <div className="bg-white text-white p-4 rounded-md shadow-md" style={{backgroundColor: "#041122"}}>
                <div className='flex justify-between'>
                <h3 className="text-xl font-semibold mb-4">Stock en Critique</h3>
                <h6 className=" font-semibold mb-4 cursor-pointer">Voir tout</h6>
                </div>
                      
                    {lowStockProducts.length > 0 ? (
        lowStockProducts.map((product, index) => (
          
          <div key={index} className='flex w-full border-2 border-black-900 cursor-pointer justify-between rounded-lg  mb-4'>
            <Link to={`/creerProduit/${product.idProduit}`}>
            <div className='flex justify-between w-full mb-4'>
            <div className='p-4'>
              <img src={`http://localhost:3001/uploads/${product.photo1}`} alt={product.nom} className="w-20 h-20 object-cover mr-4" />
            </div>

            <div className="p-4 rounded-lg">
              <p><span className="font-bold">Nom : </span>{product.nom}</p>
              <p><span className="font-bold">Référence : </span>{product.reference}</p>
              
              {/* Affichage des configurations selon la catégorie du produit */}
              {product.configPC && (
                <>
                  <p><span className="font-bold">Processeur : </span>{product.configPC.carte_graphique}</p>
                  <p><span className="font-bold">RAM/ROM : </span>{product.configPC.ram}/{product.configPC.rom}</p>
                </>
              )}

              {product.configTelephone && (
                <>
                  <p><span className="font-bold">Processeur : </span>{product.configTelephone.processeur}</p>
                  <p><span className="font-bold">RAM/ROM : </span>{product.configTelephone.ram}/{product.configTelephone.rom}</p>
                </>
              )}

              {product.configImprimante && (
                <p><span className="font-bold">Vitesse : </span>{product.configImprimante.vitesse_impression}</p>
              )}

              {product.configAccessoire && (
                <>
                  <p><span className="font-bold">Type : </span>{product.configAccessoire.type}</p>
                  <p><span className="font-bold">Compatibilité : </span>{product.configAccessoire.compatibilite}</p>
                </>
              )}
            </div>

            <div className="p-4 text-6xl rounded-lg">
              <p className='text-7xl'>
                <span className="font-bold text-red-700 text-2xl">{product.quantite_en_stock}</span>
              </p>
            </div>
            </div> 
            </Link>
          </div>
         
          
        ))
      ) : (
        <p>Aucun produit en stock critique pour le moment.</p>
      )}

                
            </div>
              
              
    </div>
          </div>
        </div>
      </div>
      
    );
  };
  
  export default Dashboard;