import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../composant/Header/header';
import Sidebar from '../composant/sidebar/sidebar';
import { FaFileExport, FaPlus, FaSearch, FaWindowClose,  FaAngleLeft, FaAngleRight, FaEye, FaFilter } from 'react-icons/fa';
import { utils, write } from 'xlsx';
import { saveAs } from 'file-saver';
import { Link, useNavigate } from 'react-router-dom';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsParPage, setProductsPerPage] = useState(10);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState('');
  const [reference, setReference] = useState('');
  const [productsData, setProductData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/api/products', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(response.data)
        setProductData(response.data);
      } catch (error) {
        console.error('erreur lors de la recuperation des produits', error)
      }
    };
    fetchProducts();
  }, []);


 


  
  // Fonction pour filtrer les produits selon le terme de recherche
  const filteredProducts = productsData.filter((product) => {
    const categoryMatch = selectedCategory ? product.categorie === selectedCategory : true;
    const quantityMatch = selectedQuantity ? 
      (selectedQuantity === "disponible" ? product.quantite_en_stock > 11 :
       selectedQuantity === "critique" ? product.quantite_en_stock <= 10 && product.quantity > 0 :
       selectedQuantity === "rupture" ? product.quantite_en_stock === 0 : true) 
      : true;

      const searchMatch = searchTerm ? 
      product.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.nom.toLowerCase().includes(searchTerm.toLowerCase()) : true;
    return categoryMatch && quantityMatch && searchMatch;
  });

  

  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / productsParPage);

  //affichage de produit
  const indexOfLastProduct = currentPage * productsParPage;
  const indexOfFirstProduct = indexOfLastProduct - productsParPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);



  // Fonction pour exporter en fichier Excel
  const exportExcel = () => {
    const ws = utils.json_to_sheet(productsData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Produits');
    const excelBuffer = write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'Produits_Report.xlsx');
  };

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: '#030C1B' }}>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 overflow-y-auto p-6 pt-20 pl-64 ml-6 mb-6" style={{ backgroundColor: '#030C1B' }}>
          <div className="p-4 mb-6">
            <div className="flex justify-between mb-6 text-white">
              <h2 className="text-2xl font-bold mb-2">Les Produits</h2>
              <div className="flex items-center">
                <button onClick={exportExcel} className="flex items-center px-4 py-2 ml-2 text-white rounded-lg">
                  <FaFileExport />
                  <p className="ml-2">Exporter</p>
                </button>
                
                  
                <button className="flex items-center px-4 py-2 ml-2 bg-red-800 text-white rounded-lg">
                  <FaPlus />
                  <Link to="/creerProduit">
                  <p className="ml-2">Créer un Produit</p>
                  </Link>
                  
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
              <span>{filteredProducts.length} résultats</span> {/* Affiche le nombre de résultats */}
              <div className="flex ml-6">
              <button
                    onClick={() => setIsFilterModalOpen(true)}
                    className="flex items-center px-4 py-2 text-white rounded-lg">
                      <FaFilter /> Filtrer
              </button>
                <select className='p-2 rounded text-white'
                style={{ backgroundColor: '#041122' }} 
                value={productsParPage}
                onChange={(e) => setProductsPerPage(Number(e.target.value))}>
                  
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
      <th className="py-2 px-4">Référence</th>
      <th className="py-2 px-4">Nom/Catégorie</th>
      <th className="py-2 px-4">Image/prix/Qte</th>
      <th className="py-2 px-4">Configuration</th>
      <th className="py-2 px-4">Action</th>
    </tr>
  </thead>
  <tbody className="text-white md-6">
    {currentProducts.map((product) => (
      <tr key={product.idProduit} className="hover:bg-gray-900 border-b">
        <td className="py-2 px-4">{product.reference}</td>
        <td className="py-2 px-4">
          {product.nom} <br />
          <span className="text-sm text-gray-500">{product.categorie}</span>
        </td>
        <td className="py-2 px-4 flex items-center">
          <img src={`http://localhost:3001/uploads/${product.photo1}`} alt={product.nom} className="h-12 w-12 mr-2" />
          <div>
            <p>{product.prix}</p>
            <p className={`text-sm ${product.quantite_en_stock > 10 ? 'text-green-600' : 'text-red-600'}`}>
              {product.quantite_en_stock} {product.statutStock}
            </p>
          </div>
        </td>
        <td className="py-2 px-4">
          {/* Afficher la configuration en fonction de la catégorie */}
          {product.categorie === 'PC' && product.configPC ? (
            <div className="flex flex-col text-sm space-y-1 text-left">
              <span><strong>Carte graphique:</strong> {product.configPC.carte_graphique}</span>
              <span><strong>Processeur:</strong> {product.configPC.processeur}</span>
              <span><strong>RAM/ROM:</strong> {product.configPC.ram}/{product.configPC.rom}</span> 
            </div>
          ) : product.categorie === 'Telephone' && product.configTelephone ? (
            <div className="flex flex-col space-y-1 text-left">
              <span><strong>Processeur:</strong> {product.configTelephone.processeur}</span>
              <span><strong>RAM:</strong> {product.configTelephone.ram}</span>
              <span><strong>ROM:</strong> {product.configTelephone.rom}</span>
            </div>
          ) : product.categorie === 'Imprimante' && product.configImprimante ? (
            <div className="flex flex-col space-y-1 text-left">
              <span><strong>Vitesse:</strong> {product.configImprimante.vitesse_impression}</span>
              <span><strong>Type:</strong> {product.configImprimante.type_d_impression}</span>
            </div>
          ) : product.categorie === 'Accessoire' && product.configAccessoire ? (
            <div className="flex flex-col space-y-1 text-left">
              <span><strong>Type:</strong> {product.configAccessoire.type_accessoire}</span>
              <span><strong>Compatibilité:</strong> {product.configAccessoire.compatibilite}</span>
            </div>
          ) : (
            <span>Aucune spécification</span>
          )}
        </td>
        <td className="py-2 px-10">
          <Link to={`/creerProduit/${product.idProduit}`}>
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
        <h2 className="text-white">Filtrer les Produits</h2>
        <button onClick={() => setIsFilterModalOpen(false)} className="text-white">
          <FaWindowClose />
        </button>
      </div>

      <div>
        <label className="text-white">Catégorie</label>
        <select
          className="w-full p-2 rounded bg-gray-700 text-white"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Tous</option>
          <option value="PC">PC</option>
          <option value="Accessoires">Accessoires</option>
          <option value="Imprimante">Imprimante</option>
          <option value="Téléphone">Téléphone</option>
        </select>
      </div>

      <div className="mt-4">
        <label className="text-white">Quantité</label>
        <select
          className="w-full p-2 rounded bg-gray-700 text-white"
          value={selectedQuantity}
          onChange={(e) => setSelectedQuantity(e.target.value)}
        >
          <option value="">Tous</option>
          <option value="disponible">Disponible (+10)</option>
          <option value="critique">Stock Critique (-10)</option>
          <option value="rupture">Rupture de Stock (0)</option>
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

export default Products;