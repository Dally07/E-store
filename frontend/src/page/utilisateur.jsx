import React, {useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../composant/Header/header';
import Sidebar from '../composant/sidebar/sidebar';
import { FaFileExport, FaPlus, FaSearch, FaWindowClose,  FaAngleLeft, FaAngleRight, FaFilter, FaEdit,  FaTrash } from 'react-icons/fa';
import { utils, write } from 'xlsx';
import { saveAs } from 'file-saver';

const Utilisateur = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersParPage, setusersPerPage] = useState(10);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedNameSort, setSelectedNameSort] = useState('');
  const [selectedIdSort, setSelectedIdSort] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    adresse: '',
    role: '',
    mot_de_passe: '',
    confirmationMotDePasse: ''
  });
  const [message, setMessage] = useState('');

  

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3001/api/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
    }
  };




    useEffect(() => {
        fetchUsers();
    }, []);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

     const handleEdit = (user) => {
    setFormData({
      nom: user.nom,
      email: user.email,
      adresse: user.adresse,
      role: user.role,
      mot_de_passe: '',
      confirmationMotDePasse: ''
    });
    setSelectedUser(user);
    setIsModalOpen(true);
  };


    const handleDelete = async (idUtilisateur) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3001/api/users/${idUtilisateur}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setUsers(users.filter(user => user.idUtilisateur !== idUtilisateur));
        setMessage("Utilisateur supprimé avec succès.");
      } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur:", error);
      }
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (selectedFile) data.append('photo', selectedFile);

    try {
      const token = localStorage.getItem('token');
      let response;
      if (selectedUser) {
        response = await axios.put(`http://localhost:3001/api/users/${selectedUser.idUtilisateur}`, data, {
          headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }
        });
        setMessage("Utilisateur mis à jour avec succès.");
      } else {
        response = await axios.post('http://localhost:3001/api/users/register', data, {
          headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }
        });
        setMessage("Utilisateur créé avec succès.");
      }
      fetchUsers();
      setIsModalOpen(false);
      setFormData({
        nom: '',
        email: '',
        adresse: '',
        role: '',
        mot_de_passe: '',
        confirmationMotDePasse: ''
      });
    } catch (error) {
      console.error('Erreur lors de la soumission des données:', error.response ? error.response.data.message : error.message);
    }
  };

  // Fonction pour filtrer et trier les utilisateurs
const filteredUsers = users
.filter((user) => {
  // Filtrer par rôle
  const categoryMatch = selectedCategory ? user.statut === selectedCategory : true;

  // recherche
  const searchMatch = searchTerm ? 
      user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) : true;
  return categoryMatch && searchMatch;
})
.sort((a, b) => {
  // Logique de tri par nom
  if (selectedNameSort) {
    if (selectedNameSort === "name_asc") {
      return a.nom.localeCompare(b.nom);
    }else if (selectedNameSort === "name_desc") {
      return b.nom.localeCompare(a.nom);
    }
  } 

  // Logique de tri par ID
  if (selectedIdSort) {
    if (selectedIdSort === "id_asc"){
      return a.id - b.id;
    }else if (selectedIdSort === "id_desc") {
      return b.id - a.id;
    }
  } 

  return 0; // Pas de tri si aucun tri sélectionné
});

  

  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / usersParPage);

  //affichage de produit
  const indexOfLastUsers = currentPage * usersParPage;
  const indexOfFirstUsers = indexOfLastUsers - usersParPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUsers, indexOfLastUsers);



  // Fonction pour exporter en fichier Excel
  const exportExcel = () => {
    const ws = utils.json_to_sheet(users);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'commande');
    const excelBuffer = write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'Users_Report.xlsx');
  };


  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: '#030C1B' }}> 
      <Header />
      <div className="flex">
        <Sidebar/>
        <div className="flex-1 overflow-y-auto p-6 pt-20 pl-64 ml-6 mb-6" style={{ backgroundColor: '#030C1B' }}>
          <div className="p-4 mb-6">
            <div className="flex justify-between mb-6 text-white">
              <h2 className="text-2xl font-bold mb-2">Liste des Utilisateur</h2>
              <div className="flex items-center">
                <button onClick={exportExcel} className="flex items-center px-4 py-2 ml-2 text-white rounded-lg">
                  <FaFileExport />
                  <p className="ml-2">Exporter</p>
                </button>
                
                  
                <button onClick={() => { setIsModalOpen(true); setSelectedUser(null); }}  className="flex items-center px-4 py-2 ml-2 bg-red-800 text-white rounded-lg">
                  <FaPlus />
                  <p className="ml-2">Créer un Utilisateur</p>
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
              <button
                    onClick={() => setIsFilterModalOpen(true)}
                    className="flex items-center px-4 py-2 text-white rounded-lg">
                      <FaFilter /> Filtrer
              </button>
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
            {message && <div className="alert text-green-800">{message}</div>}
      <table className="min-w-full table-fixed text-gray" style={{ backgroundColor: '#041122' }}>
        <thead className="text-white text-left" style={{ backgroundColor: '#041130' }}>
          <tr>
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4">Nom</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Role</th>
            <th className="py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody className="text-white">
          {currentUsers.map(user => (
            <tr key={user.idUtilisateur} className="hover:bg-gray-900 border-b text-white-500">
              <td className="py-2 px-4 text-white-500">{user.idUtilisateur}</td>
              <td className="py-2 px-4"><span className="text-sm text-white-500">{user.nom}</span></td>
              <td className="py-2 px-4"><span className="text-sm text-gray-500">{user.email}</span></td>
              <td className="py-2 px-4"><span className="text-sm text-gray-500">{user.role}</span></td>
              <td className="flex py-2 px-4">
                <FaEdit onClick={() => handleEdit(user)} className="cursor-pointer text-green-500" />
                <FaTrash onClick={() => handleDelete(user.idUtilisateur)} className='cursor-pointer text-red-800 ml-2' />
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
            <div className="flex justify-between mb-6">
              <h2 className="text-white">{selectedUser ? 'Modifier un utilisateur' : 'Créer un utilisateur'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-white">
                <FaWindowClose />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                {['nom', 'email', 'adresse', 'role'].map(field => (
                  <div className="mt-4" key={field}>
                    <label className="text-white">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                    <input
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      required
                      type={field === 'email' ? 'email' : 'text'}
                      className="w-full p-2 rounded bg-gray-700 text-white"
                      style={{ backgroundColor: '#041122' }}
                    />
                  </div>
                ))}

                {!selectedUser && (
                  <>
                    <div className="flex">
                      {['mot_de_passe', 'confirmationMotDePasse'].map(field => (
                        <div className="mt-4" key={field}>
                          <label className="text-white">{field === 'mot_de_passe' ? 'Mot de passe' : 'Confirmer le mot de passe'}</label>
                          <input
                            name={field}
                            type="password"
                            className="w-full p-2 rounded bg-gray-700 text-white"
                            style={{ backgroundColor: '#041122' }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex mt-4 justify-between">
                      <div className="mt-4">
                        <label className="text-white">Ajouter une photo</label>
                        <input
                          type="file"
                          accept=".jpg, .jpeg, .png"
                          onChange={(e) => setSelectedFile(e.target.files[0])}
                          className="hidden"
                          id="imageUpload"
                        />
                        <label
                          htmlFor="imageUpload"
                          className="w-32 h-32 border-2 border-dashed border-gray-500 flex items-center justify-center cursor-pointer"
                        >
                          {selectedFile ? (
                            <img
                              src={URL.createObjectURL(selectedFile)}
                              alt="Aperçu de l'image"
                              className="w-32 h-32 cover rounded"
                            />
                          ) : (
                            <span className="text-white text-center text-sm">Image au format jpg, png, jpeg</span>
                          )}
                        </label>
                      </div>
                    </div>
                  </>
                )}

                <div className="mt-4 flex justify-between">
                  <button type="submit" className="bg-red-600 px-8 py-2 rounded text-white">
                    {selectedUser ? 'Modifier' : 'Créer'}
                  </button>
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
        <h2 className="text-white">Filtrer les utilisateurs</h2>
        <button onClick={() => setIsFilterModalOpen(false)} className="text-white">
          <FaWindowClose />
        </button>
      </div>

      <div>
        <label className="text-white">Rôles</label>
        <select
          className="w-full p-2 rounded bg-gray-700 text-white"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Tous</option>
          <option value="Administrateur">Administrateur</option>
          <option value="Gestionnaire des commandes">Gestionnaire des commandes</option>
          <option value="Gestionnaire des produits">Gestionnaire des produits</option>
        </select>
      </div>

      <div className="mt-4">
        <label className="text-white">Trier par Nom</label>
        <select
          className="w-full p-2 rounded bg-gray-700 text-white"
          value={selectedNameSort}
          onChange={(e) => setSelectedNameSort(e.target.value)}
        >
          <option value="">Aucun tri</option>
          <option value="name_asc">Nom croissant</option>
          <option value="name_desc">Nom décroissant</option>
        </select>
      </div>

      <div className="mt-4">
        <label className="text-white">Trier par ID</label>
        <select
          className="w-full p-2 rounded bg-gray-700 text-white"
          value={selectedIdSort}
          onChange={(e) => setSelectedIdSort(e.target.value)}
        >
          <option value="">Aucun tri</option>
          <option value="id_asc">ID croissant</option>
          <option value="id_desc">ID décroissant</option>
        </select>
      </div>

      <button
        onClick={() => {
          setIsFilterModalOpen(false);
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

export default Utilisateur;