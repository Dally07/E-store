import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../composant/Header/header';
import Sidebar from '../composant/sidebar/sidebar';
import { FaFileExport, FaPlus, FaSearch, FaWindowClose,  FaAngleLeft, FaAngleRight, FaFilter, FaEdit,  FaTrash } from 'react-icons/fa';
import { utils, write } from 'xlsx';
import { saveAs } from 'file-saver';

const Client = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersParPage, setusersPerPage] = useState(10);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState('');
  const [selectedFile, setSelectedFile] =useState(null);
  const [clientData, setClientData] = useState([]);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/api/client/', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(response.data)
        setClientData(response.data);
      } catch (error) {
        console.error('erreur lors de la recuperation des produits', error)
      }
    };
    fetchClient();
  }, []);



 


  
  // Fonction pour filtrer les produits selon le terme de recherche
  const filteredUsers = clientData.filter(client => {
    const categoryMatch = selectedCategory ? client.statut === selectedCategory : true;

      const searchMatch = searchTerm ? 
      client.adresseCli.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.nomCli.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.emailCli.toLowerCase().includes(searchTerm.toLowerCase()) : true;
    return categoryMatch  && searchMatch;
  });

  

  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / usersParPage);

  //affichage de produit
  const indexOfLastUsers = currentPage * usersParPage;
  const indexOfFirstUsers = indexOfLastUsers - usersParPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUsers, indexOfLastUsers);



  // Fonction pour exporter en fichier Excel
  const exportExcel = () => {
    const ws = utils.json_to_sheet(clientData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'commande');
    const excelBuffer = write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'Clients_Report.xlsx');
  };


  //image

const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        if (!['image/jpg', 'image/jpeg', 'image/png'].includes(file.type)) {
            alert('veuillez choisir une imae au format JPG, JPEG ou PNG');
            return;
        }
        console.log('fichier selectioner:', file.name);

        setSelectedFile(file)
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
              <h2 className="text-2xl font-bold mb-2">Liste des Clients</h2>
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
              <span>{filteredUsers.length} résultats</span> {/* Affiche le nombre de résultats */}
              <div className="flex ml-6">
                <select className='p-2 rounded text-white'
                style={{ backgroundColor: '#041122' }} 
                value={usersParPage}
                onChange={(e) => setusersPerPage(Number(e.target.value))}>
                  
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
                  <th className="py-2 px-4 ">Nom</th>
                  <th className="py-2 px-4 ">Email</th>
                  <th className="py-2 px-4 ">Adresse</th>
                  <th className="py-2 px-4 ">Tel</th>
                  <th className="py-2 px-4 ">Action</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {currentUsers.map((client, index) => (
                  <tr key={index} className="hover:bg-gray-900 border-b">
                    <td className="py-2 px-4">{client.idCli}
                    </td>
                    
                    <td className="py-2 px-4">  
                      <span className="text-sm text-gray-500">{client.nomCli}</span>
                    </td>
                    <td className="py-2 px-4">  
                      <span className="text-sm text-gray-500">{client.emailCli}</span>
                      
                    </td>
                    <td className="py-2 px-4">  
                      <span className="text-sm text-gray-500">{client.adresseCli}</span>
                    </td>
                    <td className="py-2 px-4">  
                      <span className="text-sm text-gray-500">{client.telCli}</span>
                    </td>
                    
                    <td className=" flex py-2 px-4">
                      <FaEdit className="cursor-pointer text-green-500" />
                      <FaTrash className='cursor-pointer text-red-800 ml-2'/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal pour ajouter un utilisateur */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
              <div className="bg-blue-900 p-6 rounded-lg" style={{ backgroundColor: '#041130' }}>
                <div className='flex justify-between mb-6'>
                  <h2 className="text-white">Créer un Client</h2>
                  <button onClick={() => setIsModalOpen(false)} className="text-white">
                    <FaWindowClose />
                  </button>
                </div>
                
                <form>
                  <div>
                  <div className="mt-4">
                    <label className="text-white">Nom</label>
                    <input type="text" className="w-full p-2 rounded bg-gray-700 text-white" style={{ backgroundColor: '#041122' }} />
                  </div>

                  <div className="mt-4">
                    <label className="text-white">Email</label>
                    <input type="email" className="w-full p-2 rounded bg-gray-700 text-white" style={{ backgroundColor: '#041122' }} />
                  </div>
                  <div className="mt-4">
                    <label className="text-white">Adresse</label>
                    <input type="text" className="w-full p-2 rounded bg-gray-700 text-white" style={{ backgroundColor: '#041122' }} />
                  </div>
                  <div className="mt-4">
                    <label className="text-white">Telephone</label>
                    <input type="text" className="w-full p-2 rounded bg-gray-700 text-white" style={{ backgroundColor: '#041122' }} />
                  </div>
                  <div className='flex'>
                  <div className="mt-4">
                    <label className="text-white">Mot de passe</label>
                    <input type="password" className="w-full p-2 rounded bg-gray-700 text-white"  style={{ backgroundColor: '#041122' }}/>
                  </div>
                  <div className="mt-4 ml-4">
                    <label className="text-white">Confirmer le mot de passe</label>
                    <input type="password" className="w-full p-2 rounded bg-gray-700 text-white"  style={{ backgroundColor: '#041122' }}/>
                  </div>
                  </div>
                  </div>

                  <div className="flex mt-4 justify-between">

                  <div className="mt-4">
                            <label className="text-white">Ajouter une photo</label>
                                    {/* Input de fichier masqué */}
                                        <input 
                                        type="file" 
                                        accept=".jpg, .jpeg, .png" 
                                        onChange={handleImageChange} 
                                        className="hidden" 
                                        id="imageUpload"  // ID pour relier au bouton simulé
                                        />

                                    {/* Zone cliquable pour simuler l'input de fichier */}
                                    <label 
                                            htmlFor="imageUpload" 
                                            className="w-32 h-32 border-2 border-dashed border-gray-500 flex items-center justify-center cursor-pointer"
                                    >
                                    {/* Si un fichier est sélectionné, affichez l'aperçu de l'image */}
                                    {selectedFile ? (
                                        <img 
                                            src={URL.createObjectURL(selectedFile)} 
                                            alt="Aperçu de l'image" 
                                            className="w-32 h-32 cover rouunded"
                                        />
                                    ) : (
                                <span className="text-white text-center text-sm">image au format jpg, png, jpeg</span>
                                        )}
                            </label>
                        </div>
                                        <div>
                                            <button className="mt-12 bg-red-600 px-8 py-2 rounded text-white">Enregistrer</button>
                                        </div>
                    
                            
                        </div>
                 
                </form>
              </div>
            </div>
          )}

          {/* modal filtrer */}
          {isFilterModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
    <div className="bg-blue-900 p-6 rounded-lg" style={{ backgroundColor: '#041130' }}>
      <div className="flex justify-between mb-6">
        <h2 className="text-white">Filtrer les Produits</h2>
        <button onClick={() => setIsFilterModalOpen(false)} className="text-white">
          <FaWindowClose />
        </button>
      </div>

      <div>
        <label className="text-white">Roles</label>
        <select
          className="w-full p-2 rounded bg-gray-700 text-white"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="Administrateur">Terminer</option>
          <option value="Gestionnaire des commandes">Encours</option>
          <option value="Gestionnaire des produits">En traitement</option>
        </select>
      </div>

      <div className="mt-4">
        <label className="text-white">Quantité</label>
        <input type="date" 
        className="w-full p-2 rounded bg-gray-700 text-white"
        value={selectedQuantity.date}
        onChange={(e) => setSelectedQuantity(e.target.value)}/>
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

export default Client;