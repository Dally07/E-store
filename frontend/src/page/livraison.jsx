import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../composant/Header/header';
import Sidebar from '../composant/sidebar/sidebar';
import { FaFileExport, FaSearch, FaWindowClose,  FaAngleLeft, FaAngleRight, FaFilter,FaEye } from 'react-icons/fa';
import { utils, write } from 'xlsx';
import { saveAs } from 'file-saver';
import { Link } from 'react-router-dom';

const Livraison = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [LivraisonParPage, setLivraisonePerPage] = useState(10);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
 const [endDate, setEndDate] = useState('');
 const [livraison, setLivraison] = useState([]);

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
 

 useEffect(() => {
  const fetchCommande = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/livraison/');
      setLivraison(response.data);
      console.log(response);
      console.log(response.data)   
    }catch (error) {
      console.error('erreur lors de la recuperation des livraison', error)
    }   
  };
  fetchCommande();
}, []);


  // Fonction pour filtrer les factures selon le terme de recherche
  const filteredLivraison = livraison.filter(livraison => {
   

      const searchMatch = searchTerm ? 
      livraison.idLivraison.toLowerCase().includes(searchTerm.toLowerCase()) ||
      livraison.nom_livreur.toLowerCase().includes(searchTerm.toLowerCase()) : true;

      const LivraisonDate = new Date(livraison.date);
      const start = startDate ? new Date(startDate) : null
      const end = endDate ? new Date(endDate): null
      const datematch = (start && end) ? (LivraisonDate >= start && LivraisonDate <= end) : start ? (LivraisonDate >= start ) : end ? (LivraisonDate <= end) : true
   
    return searchMatch && datematch;
  });

  

  const totalLivraison = filteredLivraison.length;
  const totalPages = Math.ceil(totalLivraison / LivraisonParPage);

  //affichage de produit
  const indexOfLastLivraison = currentPage * LivraisonParPage;
  const indexOfFirstLivraison = indexOfLastLivraison - LivraisonParPage;
  const currentFacture = filteredLivraison.slice(indexOfFirstLivraison, indexOfLastLivraison);



  // Fonction pour exporter en fichier Excel
  const exportExcel = () => {
    const ws = utils.json_to_sheet(livraison);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'commande');
    const excelBuffer = write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'Livraison_Report.xlsx');
  };




  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: '#030C1B' }}>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 overflow-y-auto p-6 pt-20 pl-64 ml-6 mb-6" style={{ backgroundColor: '#030C1B' }}>
          <div className="p-4 mb-6">
            <div className="flex justify-between mb-6 text-white">
            <div></div>
              <div className="flex items-center">
                
                <button onClick={exportExcel} className="flex items-center px-4 py-2 ml-2 text-white rounded-lg">
                  <FaFileExport />
                  <p className="ml-2">Exporter</p>
                </button>
                
              </div>
            </div>

            {/* Search and filter section */}
            <div className="flex justify-between items-center mb-2 text-white">
              <div className="flex items-center rounded-md" >
              <h2 className="text-2xl font-bold mb-2">Liste des Livraison</h2>
              </div>
              <span>{filteredLivraison.length} résultats</span> {/* Affiche le nombre de résultats */}
              <div className="flex ml-6">
                <select className='p-2 rounded text-white'
                style={{ backgroundColor: '#041122' }} 
                value={LivraisonParPage}
                onChange={(e) => setLivraisonePerPage(Number(e.target.value))}>
                  
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
                <th className="py-2 px-4  ">ID</th>
                  <th className="py-2 px-4 ">Livreur/Contact</th>
                  <th className="py-2 px-4 ">Vehicule/numero du Vehicule</th>
                  <th className="py-2 px-4 ">Date de livraison</th>
                  <th className="py-2 px-4 ">date d'arriver</th>
                  <th className="py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {currentFacture.map((livraison, index) => (
                  <tr key={index} className="hover:bg-gray-900 border-b">
                    <td className="py-2 px-4">{livraison.idLivraison}
                    </td>
                    
                    <td className="py-2 px-4">  
                      <span className="text-xl text-white-500">{livraison.nom_livreur}</span> <br />
                      <span className=" text-white-500">{livraison.telephone_livreur}</span>
                    </td>
                    <td className="py-2 px-4">  
                      <span className="text-lg text-white-500">{livraison.vehicule}</span><br />
                      <span className=" text-gray-500">{livraison.numero_vehicule}</span>
                      
                    </td>
                    <td className="py-2 px-4">  
                      <span className={`text-white rounded`}>{formatDate(livraison.heure_depart)}</span>
                    </td>
                    <td className="py-2 px-4">  
                      <span className=" text-white-500">{formatDate(livraison.heure_arrivee)}</span>
                    </td>
                    
                    <td className=" py-2 px-4 ">
                      <Link to={`/infoLivraison/${livraison.idLivraison}`}>
                      <FaEye className="cursor-pointer items-center text-white-500" />
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
        <h2 className="text-white">Filtrer les date de livraison</h2>
        <button onClick={() => setIsFilterModalOpen(false)} className="text-white">
          <FaWindowClose />
        </button>
      </div>

      <div className="flex mt-4">
        <div>
        <label className="text-white">Debut</label>
        <input type="date" 
        className="w-full p-2 rounded bg-gray-700 text-white"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}/>
        </div>
            
            <div className='ml-2'>
            <label className="text-white">Fin</label>
        <input type="date" 
        className="w-full p-2 rounded bg-gray-700 text-white"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}/>
            </div>
        
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

export default Livraison;