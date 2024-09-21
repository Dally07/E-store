import React, { useState } from 'react';
import Header from '../Header/header';
import Sidebar from '../sidebar/sidebar';
import { FaFileExport, FaPlus, FaSearch, FaWindowClose,  FaAngleLeft, FaAngleRight, FaEye, FaFilter } from 'react-icons/fa';
import { utils, write } from 'xlsx';
import { saveAs } from 'file-saver';
import Asus from '../assets/asus expertbook.webp';

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsParPage, setProductsPerPage] = useState(10);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState('');

  const products = [
   { reference: 'X256', name: 'Asus ExpertBook', category: 'PC', quantity: 5, price: '1.250.000 MGA', status: 'disponible', image: `${Asus}`, configuration: 'Intel® Core™ i5 8th Gen', ram: '8GB', rom: '256GB SSD' },
    { reference: 'X357', name: 'Acer Nitro', category: 'PC', quantity: 2, price: '3.500.000 MGA', status: 'disponible', image: 'link-to-image', configuration: 'Intel® Core™ i7 10th Gen', ram: '16GB', rom: '512GB SSD' },
    { reference: 'X789', name: 'Yoga 370', category: 'PC', quantity: 5, price: '950.000 MGA', status: 'disponible', image: 'link-to-image', configuration: 'Intel® Core™ i5 7th Gen', ram: '8GB', rom: '256GB SSD' },
    { reference: 'X245', name: 'HP Envy', category: 'PC', quantity: 8, price: '2.100.000 MGA', status: 'disponible', image: 'link-to-image', configuration: 'Intel® Core™ i5 9th Gen', ram: '8GB', rom: '512GB SSD' },
    { reference: 'X568', name: 'Dell XPS 13', category: 'PC', quantity: 4, price: '4.500.000 MGA', status: 'disponible', image: 'link-to-image', configuration: 'Intel® Core™ i7 10th Gen', ram: '16GB', rom: '1TB SSD' },
    { reference: 'X376', name: 'iPad Pro', category: 'Téléphone', quantity: 7, price: '2.800.000 MGA', status: 'disponible', image: 'link-to-image', configuration: 'Apple M1', ram: '8GB', rom: '512GB' },
    {  reference: 'A005', name: 'Station d\'accueil HP',  category: 'Accessoires',  quantity: 8,  price: '200.000 MGA',  status: 'disponible', image: 'link-to-image', type: 'Station d\'accueil', compatibility: 'PC, Imprimante',},
    
    { 
      reference: 'P123', 
      name: 'Canon PIXMA G3411', 
      category: 'Imprimante', 
      quantity: 3, 
      price: '450.000 MGA', 
      status: 'disponible', 
      image: 'link-to-image', 
      configuration: 'Jet d’encre', 
      speed: '8.8 ipm noir, 5 ipm couleur',
    },
    { 
      reference: 'P124', 
      name: 'HP DeskJet 2720', 
      category: 'Imprimante', 
      quantity: 4, 
      price: '220.000 MGA', 
      status: 'disponible', 
      image: 'link-to-image', 
      configuration: 'Jet d’encre', 
      speed: '7.5 ipm noir, 5.5 ipm couleur',
    },
    { 
      reference: 'P125', 
      name: 'Brother HL-L2350DW', 
      category: 'Imprimante', 
      quantity: 2, 
      price: '650.000 MGA', 
      status: 'disponible', 
      image: 'link-to-image', 
      configuration: 'Laser', 
      speed: '32 ppm noir',
    },
    { reference: 'X561', name: 'Acer Predator', category: 'PC', quantity: 7, price: '4.200.000 MGA', status: 'disponible', image: 'link-to-image', configuration: 'Intel® Core™ i7 10th Gen', ram: '16GB', rom: '1TB SSD' },
    { reference: 'X673', name: 'MSI GF63', category: 'PC', quantity: 4, price: '2.600.000 MGA', status: 'disponible', image: 'link-to-image', configuration: 'Intel® Core™ i5 9th Gen', ram: '8GB', rom: '512GB SSD' },
    { reference: 'X778', name: 'Alienware M15', category: 'PC', quantity: 6, price: '5.500.000 MGA', status: 'disponible', image: 'link-to-image', configuration: 'Intel® Core™ i9 10th Gen', ram: '32GB', rom: '2TB SSD' },
    { reference: 'X881', name: 'Asus TUF Gaming', category: 'PC', quantity: 10, price: '3.200.000 MGA', status: 'disponible', image: 'link-to-image', configuration: 'AMD Ryzen 7 4800H', ram: '16GB', rom: '1TB SSD' },
    { reference: 'X952', name: 'Lenovo Legion 5', category: 'PC', quantity: 8, price: '3.000.000 MGA', status: 'disponible', image: 'link-to-image', configuration: 'AMD Ryzen 5 4600H', ram: '8GB', rom: '512GB SSD' },
 
    { 
      reference: 'P126', 
      name: 'Epson EcoTank ET-4700', 
      category: 'Imprimante', 
      quantity: 5, 
      price: '1.050.000 MGA', 
      status: 'disponible', 
      image: 'link-to-image', 
      configuration: 'Jet d’encre', 
      speed: '10 ipm noir, 5 ipm couleur',
    },
    { 
      reference: 'P127', 
      name: 'HP LaserJet Pro MFP M428fdw', 
      category: 'Imprimante', 
      quantity: 6, 
      price: '1.200.000 MGA', 
      status: 'disponible', 
      image: 'link-to-image', 
      configuration: 'Laser', 
      speed: '40 ppm noir',
    },
    { 
      reference: 'A001', 
      name: 'Manette PC Sonny', 
      category: 'Accessoires', 
      quantity: 30, 
      price: '20.000 MGA', 
      status: 'disponible', 
      image: 'link-to-image', 
      type: 'Manette', 
      compatibility: 'PC',
    },
    { 
      reference: 'A002', 
      name: 'Clavier Logitech K380', 
      category: 'Accessoires', 
      quantity: 15, 
      price: '75.000 MGA', 
      status: 'disponible', 
      image: 'link-to-image', 
      type: 'Clavier', 
      compatibility: 'PC, Téléphone',
    },
    { 
      reference: 'A003', 
      name: 'Casque HyperX Cloud II', 
      category: 'Accessoires', 
      quantity: 10, 
      price: '150.000 MGA', 
      status: 'disponible', 
      image: 'link-to-image', 
      type: 'Casque', 
      compatibility: 'PC, Téléphone',
    },
    { 
      reference: 'A004', 
      name: 'Chargeur sans fil Samsung', 
      category: 'Accessoires', 
      quantity: 25, 
      price: '50.000 MGA', 
      status: 'disponible', 
      image: 'link-to-image', 
      type: 'Chargeur', 
      compatibility: 'Téléphone',
    },
   { reference: 'X482', name: 'Surface Pro 7', category: 'PC', quantity: 3, price: '1.700.000 MGA', status: 'disponible', image: 'link-to-image', configuration: 'Intel® Core™ i5 10th Gen', ram: '8GB', rom: '128GB SSD' },
    { reference: 'X634', name: 'Samsung Galaxy Tab', category: 'Téléphone', quantity: 10, price: '1.100.000 MGA', status: 'disponible', image: 'link-to-image', configuration: 'Snapdragon 865', ram: '6GB', rom: '128GB' },
    { reference: 'X915', name: 'Lenovo ThinkPad', category: 'PC', quantity: 6, price: '2.300.000 MGA', status: 'disponible', image: 'link-to-image', configuration: 'Intel® Core™ i7 8th Gen', ram: '16GB', rom: '512GB SSD' },
    { reference: 'X026', name: 'MacBook Pro', category: 'PC', quantity: 9, price: '5.700.000 MGA', status: 'disponible', image: 'link-to-image', configuration: 'Apple M1', ram: '16GB', rom: '1TB SSD' },
    { reference: 'X147', name: 'Lenovo IdeaPad', category: 'PC', quantity: 12, price: '1.350.000 MGA', status: 'disponible', image: 'link-to-image', configuration: 'Intel® Core™ i5 9th Gen', ram: '8GB', rom: '256GB SSD' },
    { reference: 'X298', name: 'Dell Inspiron', category: 'PC', quantity: 15, price: '2.000.000 MGA', status: 'disponible', image: 'link-to-image', configuration: 'Intel® Core™ i5 8th Gen', ram: '8GB', rom: '512GB SSD' },
    { reference: 'X354', name: 'HP Pavilion', category: 'PC', quantity: 18, price: '1.800.000 MGA', status: 'disponible', image: 'link-to-image', configuration: 'Intel® Core™ i5 10th Gen', ram: '8GB', rom: '512GB SSD' },
    { reference: 'X412', name: 'Asus ROG Strix', category: 'PC', quantity: 5, price: '3.800.000 MGA', status: 'disponible', image: 'link-to-image', configuration: 'Intel® Core™ i7 9th Gen', ram: '16GB', rom: '1TB SSD' },
   ];

 


  
  // Fonction pour filtrer les produits selon le terme de recherche
  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory ? product.category === selectedCategory : true;
    const quantityMatch = selectedQuantity ? 
      (selectedQuantity === "disponible" ? product.quantity > 11 :
       selectedQuantity === "critique" ? product.quantity <= 10 && product.quantity > 0 :
       selectedQuantity === "rupture" ? product.quantity === 0 : true) 
      : true;

      const searchMatch = searchTerm ? 
      product.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
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
    const ws = utils.json_to_sheet(products);
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
                
                  
                <button onClick={() => setIsModalOpen(true)} className="flex items-center px-4 py-2 ml-2 bg-red-800 text-white rounded-lg">
                  <FaPlus />
                  <p className="ml-2">Créer un Produit</p>
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
              <thead className="text-white" style={{ backgroundColor: '#041130' }}>
                <tr>
                <th className="py-2 px-4 ">Référence</th>
                  <th className="py-2 px-4">Nom/Catégorie</th>
                  <th className="py-2 px-4">Image/prix/Qte</th>
                  <th className="py-2 px-4">Configuration</th>
                  <th className="py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody className="text-white md-6">
                {currentProducts.map((product, index) => (
                  <tr key={index} className="hover:bg-gray-900 border-b">
                    <td className="py-2 px-10">{product.reference}</td>
                    <td className="py-2 px-6">
                      {product.name} <br />
                      <span className="text-sm text-gray-500">{product.category}</span>
                    </td>
                    <td className="py-2 px-10 flex items-center">
                      <img src={product.image} alt={product.name} className="h-12 w-12 mr-2 items-center" />
                      <div>
                        <p>{product.price}</p>
                        <p className={`text-sm ${product.quantity > 10 ? 'text-green-600' : 'text-red-600'}`}>
                          {product.quantity} {product.status}
                        </p>
                      </div>
                    </td>
                    <td className="py-2 px-4">
        {/* Aligner RAM, ROM et Processeur avec Tailwind */}
        {product.category === 'PC' || product.category === 'Téléphone' ? (
          <div className="flex flex-col space-y-1 text-left">
            <span><strong>Processeur:</strong> {product.configuration}</span>
            <span><strong>RAM:</strong> {product.ram}</span>
            <span><strong>ROM:</strong> {product.rom}</span>
          </div>
        ) : product.category === 'Imprimante' ? (
          <div className="flex flex-col space-y-1 text-left">
            <span><strong>Vitesse:</strong> {product.speed}</span>
            <span><strong>configuration:</strong>{product.configuration}</span>
          </div>
          
          
        ) : product.category === 'Accessoires' ? (
          <div className="flex flex-col space-y-1 text-left">
            <span><strong>Type:</strong> {product.type}</span>
            <span><strong>Compatibilité:</strong> {product.compatibility}</span>
          </div>
        ) : (
          <span>Aucune spécification</span>
        )}
      </td>
                    <td className="py-2 px-10">
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