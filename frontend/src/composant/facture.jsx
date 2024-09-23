import React, { useState } from 'react';
import Header from '../Header/header';
import Sidebar from '../sidebar/sidebar';
import { FaFileExport, FaSearch, FaWindowClose,  FaAngleLeft, FaAngleRight, FaFilter,FaEye } from 'react-icons/fa';
import { utils, write } from 'xlsx';
import { saveAs } from 'file-saver';

const Facture = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [factureParPage, setfacturePerPage] = useState(10);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [startDate, setStartDate] = useState('');
 const [endDate, setEndDate] = useState('');
 

  const facture = [
    {id: '1', idCommande:'2', total: '5.800.000.MGA', statut: 'Payer', date: '2024-09-12'},
    {id: '2', idCommande:'3', total: '450.000 MGA', statut: 'Non payer', date: '2024-09-12'},

];

 


  
  // Fonction pour filtrer les factures selon le terme de recherche
  const filteredfacture = facture.filter(facture => {
    const categoryMatch = selectedCategory ? facture.statut === selectedCategory : true;
   

      const searchMatch = searchTerm ? 
      facture.idCommande.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facture.statut.toLowerCase().includes(searchTerm.toLowerCase()) : true;

      const factureDate = new Date(facture.date);
      const start = startDate ? new Date(startDate) : null
      const end = endDate ? new Date(endDate): null
      const datematch = (start && end) ? (factureDate >= start && factureDate <= end) : start ? (factureDate >= start ) : end ? (factureDate <= end) : true
   
    return categoryMatch && searchMatch && datematch;
  });

  

  const totalfacture = filteredfacture.length;
  const totalPages = Math.ceil(totalfacture / factureParPage);

  //affichage de produit
  const indexOfLastFacture = currentPage * factureParPage;
  const indexOfFirstFacure = indexOfLastFacture - factureParPage;
  const currentFacture = filteredfacture.slice(indexOfFirstFacure, indexOfLastFacture);



  // Fonction pour exporter en fichier Excel
  const exportExcel = () => {
    const ws = utils.json_to_sheet(facture);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'commande');
    const excelBuffer = write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'faxture_Report.xlsx');
  };

  const getBackgrounColor = (statut) => {
    switch (statut) {
        case 'Payer' : return 'bg-green-500';
        case 'Non payer' : return 'bg-yellow-600';
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
              <h2 className="text-2xl font-bold mb-2">Liste des Facture</h2>
              <div className="flex items-center">
                <button onClick={exportExcel} className="flex items-center px-4 py-2 ml-2 text-white rounded-lg">
                  <FaFileExport />
                  <p className="ml-2">Exporter</p>
                </button>
                
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
              <span>{filteredfacture.length} résultats</span> {/* Affiche le nombre de résultats */}
              <div className="flex ml-6">
              <button
                    onClick={() => setIsFilterModalOpen(true)}
                    className="flex items-center px-4 py-2 text-white rounded-lg">
                      <FaFilter /> Filtrer
              </button>
                <select className='p-2 rounded text-white'
                style={{ backgroundColor: '#041122' }} 
                value={factureParPage}
                onChange={(e) => setfacturePerPage(Number(e.target.value))}>
                  
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
                  <th className="py-2 px-4 ">Numero commande</th>
                  <th className="py-2 px-4 ">Total</th>
                  <th className="py-2 px-4 ">Statut</th>
                  <th className="py-2 px-4 ">Date</th>
                  <th className="py-2 px-4 ">Action</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {currentFacture.map((facture, index) => (
                  <tr key={index} className="hover:bg-gray-900 border-b">
                    <td className="py-2 px-4">{facture.id}
                    </td>
                    
                    <td className="py-2 px-4">  
                      <span className="text-sm text-gray-500">{facture.idCommande}</span>
                    </td>
                    <td className="py-2 px-4">  
                      <span className="text-sm text-gray-500">{facture.total}</span>
                      
                    </td>
                    <td className="py-2 px-4">  
                      <span className={`text-white rounded ${getBackgrounColor(facture.statut)}`}>{facture.statut}</span>
                    </td>
                    <td className="py-2 px-4">  
                      <span className="text-sm text-gray-500">{facture.date}</span>
                    </td>
                    
                    <td className=" flex py-2 px-4">
                      <FaEye className="cursor-pointer text-white-500" />
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
        <h2 className="text-white">Filtrer les Factures</h2>
        <button onClick={() => setIsFilterModalOpen(false)} className="text-white">
          <FaWindowClose />
        </button>
      </div>

      <div>
        <label className="text-white">Statut</label>
        <select
          className="w-full p-2 rounded bg-gray-700 text-white"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
            <option value="">Tout</option>
          <option value="Payer">Payer</option>
          <option value="Non payer">Non payer</option>
        </select>
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

export default Facture;