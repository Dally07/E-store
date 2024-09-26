import React, { useState } from 'react';
import Header from '../composant/Header/header';
import Sidebar from '../composant/sidebar/sidebar';
import { FaFileExport, FaPlus, FaSearch, FaWindowClose,  FaAngleLeft, FaAngleRight, FaEye, FaFilter } from 'react-icons/fa';
import { utils, write } from 'xlsx';
import { saveAs } from 'file-saver';

const Commande = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersParPage, setcommandePerPage] = useState(10);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
 const [startDate, setStartDate] = useState('');
 const [endDate, setEndDate] = useState('');

  const commande = [
    {id: '25', date:'2024-09-15', statut: 'Terminer', totale: '5.500.000 MGA', payement:'Mvola', nom: 'Sitraka', email: 'sitraka@gmail.com', telephone:'0345685471', produits:'link photo'},
    {id: '25', date:'2024-09-15', statut: 'Terminer', totale: '5.500.000 MGA', payement:'Mvola', nom: 'Sitraka', email: 'sitraka@gmail.com', telephone:'0345685471', produits:'link photo'},
    {id: '25', date:'2024-09-15', statut: 'Terminer', totale: '5.500.000 MGA', payement:'Mvola', nom: 'Sitraka', email: 'sitraka@gmail.com', telephone:'0345685471', produits:'link photo'},
    {id: '25', date:'2024-09-15', statut: 'Terminer', totale: '5.500.000 MGA', payement:'Mvola', nom: 'Sitraka', email: 'sitraka@gmail.com', telephone:'0345685471', produits:'link photo'},
    {id: '25', date:'2024-09-15', statut: 'Terminer', totale: '5.500.000 MGA', payement:'Mvola', nom: 'Sitraka', email: 'sitraka@gmail.com', telephone:'0345685471', produits:'link photo'},
    {id: '25', date:'2024-09-15', statut: 'Terminer', totale: '5.500.000 MGA', payement:'Mvola', nom: 'Sitraka', email: 'sitraka@gmail.com', telephone:'0345685471', produits:'link photo'},
    {id: '25', date:'2024-09-15', statut: 'Terminer', totale: '5.500.000 MGA', payement:'Mvola', nom: 'Sitraka', email: 'sitraka@gmail.com', telephone:'0345685471', produits:'link photo'},
    {id: '25', date:'2024-09-15', statut: 'Terminer', totale: '5.500.000 MGA', payement:'Mvola', nom: 'Sitraka', email: 'sitraka@gmail.com', telephone:'0345685471', produits:'link photo'},
    {id: '25', date:'2024-09-15', statut: 'Terminer', totale: '5.500.000 MGA', payement:'Mvola', nom: 'Sitraka', email: 'sitraka@gmail.com', telephone:'0345685471', produits:'link photo'},  
    {id: '25', date:'2024-09-15', statut: 'Terminer', totale: '5.500.000 MGA', payement:'Mvola', nom: 'Sitraka', email: 'sitraka@gmail.com', telephone:'0345685471', produits:'link photo'},
    {id: '25', date:'2024-09-15', statut: 'Terminer', totale: '5.500.000 MGA', payement:'Mvola', nom: 'Sitraka', email: 'sitraka@gmail.com', telephone:'0345685471', produits:'link photo'},
    {id: '25', date:'2024-09-15', statut: 'Terminer', totale: '5.500.000 MGA', payement:'Mvola', nom: 'Sitraka', email: 'sitraka@gmail.com', telephone:'0345685471', produits:'link photo'},
    {id: '25', date:'2024-09-15', statut: 'Terminer', totale: '5.500.000 MGA', payement:'Mvola', nom: 'Sitraka', email: 'sitraka@gmail.com', telephone:'0345685471', produits:'link photo'},
    {id: '25', date:'2024-09-15', statut: 'Terminer', totale: '5.500.000 MGA', payement:'Mvola', nom: 'Sitraka', email: 'sitraka@gmail.com', telephone:'0345685471', produits:'link photo'},
    {id: '25', date:'2024-09-15', statut: 'Terminer', totale: '5.500.000 MGA', payement:'Mvola', nom: 'Sitraka', email: 'sitraka@gmail.com', telephone:'0345685471', produits:'link photo'},
    {id: '25', date:'2024-09-15', statut: 'Terminer', totale: '5.500.000 MGA', payement:'Mvola', nom: 'Sitraka', email: 'sitraka@gmail.com', telephone:'0345685471', produits:'link photo'},
    {id: '25', date:'2024-09-15', statut: 'Terminer', totale: '5.500.000 MGA', payement:'Mvola', nom: 'Sitraka', email: 'sitraka@gmail.com', telephone:'0345685471', produits:'link photo'},
    {id: '25', date:'2024-09-15', statut: 'Terminer', totale: '5.500.000 MGA', payement:'Mvola', nom: 'Sitraka', email: 'sitraka@gmail.com', telephone:'0345685471', produits:'link photo'},
    {id: '25', date:'2024-09-15', statut: 'Terminer', totale: '5.500.000 MGA', payement:'Mvola', nom: 'Sitraka', email: 'sitraka@gmail.com', telephone:'0345685471', produits:'link photo'},
    {id: '25', date:'2024-09-15', statut: 'Terminer', totale: '5.500.000 MGA', payement:'Mvola', nom: 'Sitraka', email: 'sitraka@gmail.com', telephone:'0345685471', produits:'link photo'},
    {id: '25', date:'2024-09-15', statut: 'Terminer', totale: '5.500.000 MGA', payement:'Mvola', nom: 'Sitraka', email: 'sitraka@gmail.com', telephone:'0345685471', produits:'link photo'},
    {id: '25', date:'2024-09-15', statut: 'Terminer', totale: '5.500.000 MGA', payement:'Mvola', nom: 'Sitraka', email: 'sitraka@gmail.com', telephone:'0345685471', produits:'link photo'},
    {id: '25', date:'2024-09-15', statut: 'Terminer', totale: '5.500.000 MGA', payement:'Mvola', nom: 'Sitraka', email: 'sitraka@gmail.com', telephone:'0345685471', produits:'link photo'},
    {id: '25', date:'2024-09-15', statut: 'En traitement', totale: '5.500.000 MGA', payement:'Mvola', nom: 'Sitraka', email: 'sitraka@gmail.com', telephone:'0345685471', produits:'link photo'},
    {id: '25', date:'2024-09-15', statut: 'Terminer', totale: '5.500.000 MGA', payement:'Mvola', nom: 'Sitraka', email: 'sitraka@gmail.com', telephone:'0345685471', produits:'link photo'},
    {id: '25', date:'2024-09-15', statut: 'Terminer', totale: '5.500.000 MGA', payement:'Mvola', nom: 'Sitraka', email: 'sitraka@gmail.com', telephone:'0345685471', produits:'link photo'},
    {id: '25', date:'2024-09-18', statut: 'Encours', totale: '5.500.000 MGA', payement:'Mvola', nom: 'Sitraka', email: 'sitraka@gmail.com', telephone:'0345685471', produits:'link photo'},
    {id: '25', date:'2024-09-15', statut: 'Terminer', totale: '5.500.000 MGA', payement:'Mvola', nom: 'Sitraka', email: 'sitraka@gmail.com', telephone:'0345685471', produits:'link photo'},
    {id: '25', date:'2024-09-15', statut: 'Terminer', totale: '5.500.000 MGA', payement:'Mvola', nom: 'Sitraka', email: 'sitraka@gmail.com', telephone:'0345685471', produits:'link photo'},
    {id: '25', date:'2024-09-15', statut: 'Terminer', totale: '5.500.000 MGA', payement:'Mvola', nom: 'Sitraka', email: 'sitraka@gmail.com', telephone:'0345685471', produits:'link photo'},

];



  
  // Fonction pour filtrer les produits selon le terme de recherche
  const filteredOrder = commande.filter(commande => {
    const categoryMatch = selectedCategory ? commande.statut === selectedCategory : true;

      const searchMatch = searchTerm ? 
      commande.statut.toLowerCase().includes(searchTerm.toLowerCase()) ||
      commande.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      commande.email.toLowerCase().includes(searchTerm.toLowerCase()) : true;

      const commandeDate = new Date(commande.date);
      const start = startDate ? new Date(startDate) : null
      const end = endDate ? new Date(endDate): null
      const datematch = (start && end) ? (commandeDate >= start && commandeDate <= end) : start ? (commandeDate >= start ) : end ? (commandeDate <= end) : true
    return categoryMatch  && searchMatch && datematch;
  });

  

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
                
                  
                <button onClick={() => setIsModalOpen(true)} className="flex items-center px-4 py-2 ml-2 bg-red-800 text-white rounded-lg">
                  <FaPlus />
                  <p className="ml-2">Créer un commande</p>
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
                <th className="py-2 px-4 ">ID/Date/Statut</th>
                  <th className="py-2 px-4">Total/Payement</th>
                  <th className="py-2 px-4">Nom/Email</th>
                  <th className="py-2 px-4">Produits</th>
                  <th className="py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody className="text-white md-6">
                {currentOrders.map((commande, index) => (
                  <tr key={index} className="hover:bg-gray-900 border-b">
                    <td className="py-2 px-4">{commande.id} <br />
                        {commande.date} <br />
                        <span className={`text-white rounded ${getBackgrounColor(commande.statut)}`}>{commande.statut}</span>
                    </td>
                    
                    <td className="py-2 px-4">  
                      <span className="text-sm text-gray-500">{commande.totale}</span><br />
                      <span className="text-sm text-gray-500">{commande.payement}</span>
                    </td>
                    <td className="py-2 px-4">  
                      <span className="text-sm text-gray-500">{commande.nom}</span><br />
                      <span typeof='email' className="text-sm text-gray-500">{commande.email}</span><br />
                      <span className="text-sm text-gray-500">{commande.telephone}</span>
                      
                    </td>
                    <td className="py-2 px-4">  
                      <img className="text-sm text-gray-500" src={commande.produits} alt={commande.produits} />
                    </td>
                    
                    <td className="py-2 px-4">
                      <FaEye className="cursor-pointer" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal pour ajouter un produit */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
              <div className="bg-blue-900 p-6 rounded-lg" style={{ backgroundColor: '#041130' }}>
                <div className='flex justify-between mb-6'>
                  <h2 className="text-white">Créer un nouveau produit</h2>
                  <button onClick={() => setIsModalOpen(false)} className="text-white">
                    <FaWindowClose />
                  </button>
                </div>
                
                <form>
                  <div>
                    <label className="text-white">Catégories</label>
                    <select className="w-full p-2 rounded bg-gray-700 text-white">
                      <option>PC</option>
                      <option>Accessoires</option>
                      <option>Imprimante</option>
                      <option>Telephone</option>
                    </select>
                  </div>
                  <div className="mt-4">
                    <label className="text-white">Référence</label>
                    <input type="text" className="w-full p-2 rounded bg-gray-700 text-white" />
                  </div>
                  <button className="mt-4 bg-red-600 px-4 py-2 rounded text-white">Enregistrer</button>
                </form>
              </div>
            </div>
          )}

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
        <label className="text-white">Statut</label>
        <select
          className="w-full p-2 rounded bg-gray-700 text-white"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
            <option value="">Tout</option>
          <option value="Terminer">Terminer</option>
          <option value="Encours">Encours</option>
          <option value="En traitement">En traitement</option>
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

export default Commande;