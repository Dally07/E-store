import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Header from '../composant/Header/header';
import Sidebar from '../composant/sidebar/sidebar';
import { FaFileExport, FaSearch, FaWindowClose,  FaAngleLeft, FaAngleRight, FaEye, FaFilter } from 'react-icons/fa';
import { utils, write } from 'xlsx';
import { saveAs } from 'file-saver';
import { Link } from 'react-router-dom';

const Commande = () => {
  //const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersParPage, setcommandePerPage] = useState(10);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
 const [startDate, setStartDate] = useState('');
 const [endDate, setEndDate] = useState('');
 const [commande, setCommande] = useState([])

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


 const getBackground = (statut) => {
  switch(statut) {
    case 'En traitement' : return 'bg-yellow-500';
    case 'En livraison' : return 'bg-green-500';
    case 'Livrée' : return 'bg-green-800';
    case 'Annulée' : return 'bg-gray-500';
  }
 }

 const getBackgroundPayement = (statut) => {
  switch(statut) {
    case 'En attente' : return 'text-yellow-500';
    case 'Complété' : return 'text-green-500';
    case 'Non payer' : return 'text-red-500';
    case 'Remboursé' : return 'text-gray-500';
  }
 }

  useEffect(() => {
    const fetchCommande = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/commande');
        setCommande(response.data);
        console.log(response);
        console.log(response.data)
      
      }catch (error) {
        console.error('erreur lors de la recuperation des commandes', error)
      }
      
    };
    fetchCommande();
  }, []);



  
  // Fonction pour filtrer les produits selon le terme de recherche
  const filteredOrder = Array.isArray(commande) ? commande.filter(commande => {
    const categoryMatch = selectedCategory ? commande.statut === selectedCategory : true;

      const searchMatch = searchTerm ? 
      commande.statut.toLowerCase().includes(searchTerm.toLowerCase()) ||
      commande.client.nomCli.toLowerCase().includes(searchTerm.toLowerCase()) ||
      commande.client.emailCli.toLowerCase().includes(searchTerm.toLowerCase()) : true;

      const commandeDate = new Date(commande.date);
      const start = startDate ? new Date(startDate) : null
      const end = endDate ? new Date(endDate): null
      const datematch = (start && end) ? (commandeDate >= start && commandeDate <= end) : start ? (commandeDate >= start ) : end ? (commandeDate <= end) : true
    return categoryMatch  && searchMatch && datematch;
  }) : []

  

  const totalOrders = filteredOrder.length;
  const totalPages = Math.ceil(totalOrders / ordersParPage);

  //affichage de produit
  const indexOfLastOrders = currentPage * ordersParPage;
  const indexOfFirstOrders = indexOfLastOrders - ordersParPage;
  const currentOrders = filteredOrder.slice(indexOfFirstOrders, indexOfLastOrders);



  // Fonction pour exporter en fichier Excel
  const exportExcel = () => {
    const ws = utils.json_to_sheet(commande);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'commande');
    const excelBuffer = write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'Commande_Report.xlsx');
  };


  const getBackgrounColor = (statut) => {
    switch (statut) {
        case 'Terminer' : return 'bg-green-500';
        case 'Encours' : return 'bg-yellow-500';
        case 'En traitement' : return 'bg-gray-500';
        default: return '';
    }
  }

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: '#030C1B' }}>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 overflow-y-auto p-6 pt-20 pl-64 ml-6 mb-6" style={{ backgroundColor: '#030C1B' }}>
          <div className="p-4 mb-6">
            <div className="flex justify-between mb-6 text-white">
              <h2 className="text-2xl font-bold mb-2">Les Commandes</h2>
              <div className="flex items-center">
                <button onClick={exportExcel} className="flex items-center px-4 py-2 ml-2 text-white rounded-lg">
                  <FaFileExport />
                  <p className="ml-2">Exporter</p>
                </button>
                
                  
                {/*<button onClick={() => setIsModalOpen(true)} className="flex items-center px-4 py-2 ml-2 bg-red-800 text-white rounded-lg">
                  <FaPlus />
                  <p className="ml-2">Créer un commande</p>
                </button>*/}
              </div>
            </div>

            {/* Search and filter section */}
            <div className="flex justify-between items-center mb-2 text-white">
              <div className="flex items-center rounded-md" style={{ backgroundColor: '#041122' }}>
                <input
                  type="text"
                  placeholder="recherche"
                  className="w-[300px] p-2 rounded focus:outline-none text-gray-100"
                  style={{ backgroundColor: '#041122' }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} // Met à jour l'état de recherche
                />
                <FaSearch className="text-gray-400 mr-2" />
              </div>
              <span>{filteredOrder.length} résultats</span> {/* Affiche le nombre de résultats */}
              <div className="flex ml-6">
              <button
                    onClick={() => setIsFilterModalOpen(true)}
                    className="flex items-center px-4 py-2 text-white rounded-lg">
                      <FaFilter /> Filtrer
              </button>
                <select className='p-2 rounded text-white'
                style={{ backgroundColor: '#041122' }} 
                value={ordersParPage}
                onChange={(e) => setcommandePerPage(Number(e.target.value))}>
                  
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
                <span className='flex items-center ml-2 text-white '>par page</span>
                <button className="flex items-center px-4 py-2 text-white rounded-lg">
                  <span className='text-white ml-8'>Page {currentPage} sur {totalPages}</span>
                </button>
                <button onClick={() => 
                  setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                   className={`flex items-center px-4 py-2 text-white rounded-lg ${currentPage === 1 ? 'opacity-50' : 'bg-blue-500'}`} style={{ backgroundColor: '#041130' }}>
                  <FaAngleLeft className="ml-2" />
                </button>
                <button onClick={() => 
                  setCurrentPage(currentPage + 1)
                } 
                disabled={currentPage === totalPages}
                className={`flex items-center px-4 py-2 text-white rounded-lg ${currentPage === totalPages ? 'opacity-50' : 'bg-blue-500'}`} style={{ backgroundColor: '#041130' }}>
                  <FaAngleRight />
                </button>
              </div>
            </div>

            {/* Table des produits */}
            <table className="min-w-full table-fixed text-gray" style={{ backgroundColor: '#041122' }}>
              <thead className="text-white text-left" style={{ backgroundColor: '#041130' }}>
                <tr>
                <th className="py-2 px-4 ">Ref/Date/Statut</th>
                  <th className="py-2 px-4">Total/payement/statut</th>
                  <th className="py-2 px-4">Nom/Email</th>
                  <th className="py-2 px-4 justify-center text-center">Produits commander</th>
                  <th className="py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody className="text-white md-6">
                {currentOrders.map((commande, index) => (
                  <tr key={index} className="hover:bg-gray-900 border-b text-xl">
                    <td className="py-2 px-4 text-xl">#{commande.idCommande} <br />
                        {formatDate(commande.date_commande)} <br />
                        <span className={`text-sm rounded-lg px-2 ${getBackground(commande.statut)}`}>{commande.statut}</span>
                    </td>
                    
                    <td className="py-2 px-4">  
                      <span className="text-xl text-gray-100">{commande.total} MGA</span><br />
                      {commande.paiement.map((paiement) => (
                      <span ><span className={`text-sm px-2 text-white-500  rounded-lg ${getBackgroundPayement(paiement.statut)}`}>{paiement.statut} </span><p className='text-gray-500 text-sm'>{paiement.methode}</p></span>
                      
                    ))}
                    </td>
                    <td className="py-2 px-4">  
                      <span className="text-lg text-white-500">{commande.client.nomCli}</span><br />
                      <span typeof='email' className="text-sm text-blue-500">{commande.client.emailCli}</span><br />
                      <span className="text-sm text-blue-500">{commande.client.telCli}</span>
                      
                    </td>
                    {commande.produits.slice(0,3).map((produit, index) => (
                        <td className="flex flex-row p-0 justify-center items-center " key={index}>  
                        <img className="w-13 h-12 object-contain m-1 p-0" style={{marginRight: "4px"}} src={`http://localhost:3001/uploads/${produit.photo1}`} alt={commande.produits.photo1} />
                      </td>
                    ))}
                    
                    
                    <td className="py-2 px-4">
                     <Link to={`/infoCommande/${commande.idCommande}`}>
                     <FaEye className="cursor-pointer" />
                     </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* modal filtrer */}
          {isFilterModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
    <div className="bg-blue-900 p-6 rounded-lg" style={{ backgroundColor: '#041130' }}>
      <div className="flex justify-between mb-6">
        <h2 className="text-white">Filtrer les Commandes</h2>
        <button onClick={() => setIsFilterModalOpen(false)} className="text-white">
          <FaWindowClose />
        </button>
      </div>

      <div>
        <label className="text-white">Statut : </label>
        <select
          className="w- p-2 rounded bg-gray-700 text-white"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
            <option value="">Tout</option>
          <option value="En traitement">En traitement</option>
          <option value="En livraison">En livraison</option>
          <option value="Livrée">Livrée</option>
          <option value="Annulée">Annulée</option>
        </select>
      </div>

      
      <button
        onClick={() => {
          setIsFilterModalOpen(false);
          // Logique de filtrage à ajouter ici
        }}
        className="mt-4 bg-red-600 px-4 py-2 rounded text-white"
      >
        Valider
      </button>
    </div>
  </div>
)}




        </div>
      </div>
    </div>
  );
};

export default Commande;