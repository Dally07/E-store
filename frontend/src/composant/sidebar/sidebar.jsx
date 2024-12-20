import React, { useState } from 'react';
import { FaBars, FaTachometerAlt, FaBoxes, FaChartLine, FaCogs, FaChevronDown, FaUser, FaLifeRing, FaDotCircle, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null); // Gère quel menu est ouvert
  const navigate = useNavigate();

  const toggleMenu = (menu) => {
    // Si on clique sur un menu déjà ouvert, on le ferme; sinon, on ouvre le menu sélectionné
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex">
      <div className="md:hidden flex items-center p-4">
        <button onClick={() => toggleMenu(null)} className="text-white">
          <FaBars size={24} />
        </button>
      </div>

      <aside className={`fixed top-20 left-0 h-screen w-64 shadow-lg text-white transition-transform duration-300 ease-in-out z-50 md:translate-x-0`} style={{ backgroundColor: "#041122" }}>
        <nav className="p-4 h-full justify-between">
          <ul>
            <li className="mb-6">
              <Link to="/dashboard">
                <div className="flex justify-between cursor-pointer hover:bg-red-800 p-2 rounded-md transition duration-200">
                  <span><FaTachometerAlt className="inline mr-3" /> Dashboard</span>
                </div>
              </Link>
            </li>

            <li className="mb-6">
              <div onClick={() => toggleMenu('ventes')} className="flex justify-between cursor-pointer hover:bg-red-800 p-2 rounded-md transition duration-200">
              <Link to="/commande">
                <span><FaChartLine className="inline mr-3" /> Ventes</span>
                </Link>
                <FaChevronDown />
              </div>
              {openMenu === 'ventes' && (
                <ul className=" px-6 "style={{ backgroundColor: '#030C1B' }}>
                  <li>
                    <Link to="/commande">
                      <span><FaDotCircle className="inline mr-3 m-4 hover:bg-blue-800" size={10} /> Commande</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/livraison">
                      <span><FaDotCircle className="inline mr-3 m-4" size={10} /> Expédition</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/facture">
                      <span><FaDotCircle className="inline mr-3 m-4" size={10} /> Facture</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li className="mb-6">
              <div onClick={() => toggleMenu('inventaire')} className="flex justify-between cursor-pointer hover:bg-red-800 p-2 rounded-md transition duration-200">
                <Link to="/products">
                <span><FaBoxes className="inline mr-3" /> Inventaire</span>
                </Link>
                
                <FaChevronDown />
              </div>
              {openMenu === 'inventaire' && (
                <ul className="px-6"style={{ backgroundColor: '#030C1B' }}>
                  <li>
                    <Link to="/products">
                      <span><FaDotCircle className="inline mr-3 m-4" size={10} /> Produits</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li className="mb-6">
              <Link to="/rapport">
                <div className="flex justify-between cursor-pointer hover:bg-red-800 p-2 rounded-md transition duration-200">
                  <span><FaLifeRing className="inline mr-3" /> Rapport</span>
                </div>
              </Link>
            </li>

            <li className="mb-6">
              <Link to="/client">
                <div className="flex justify-between cursor-pointer hover:bg-red-800 p-2 rounded-md transition duration-200">
                  <span><FaUser className="inline mr-3" /> Client</span>
                </div>
              </Link>
            </li>

            <li className="mb-6">
              <div onClick={() => toggleMenu('parametres')} className="flex justify-between cursor-pointer hover:bg-red-800 p-2 rounded-md transition duration-200">
                <Link to="/utilisateur">
                <span><FaCogs className="inline mr-3" /> Paramètres</span>
                </Link>
               
                <FaChevronDown />
              </div>
              {openMenu === 'parametres' && (
                <ul className="px-6"style={{ backgroundColor: '#030C1B' }} >
                  <li>
                    <Link to="/utilisateur">
                      <span><FaDotCircle className="inline mr-3 m-4" size={10} /> Utilisateur</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>

          <ul>
            <div className="flex justify-between cursor-pointer hover:bg-red-800 p-2 rounded-md transition duration-200" onClick={handleLogout}>
              <span><FaSignOutAlt className="inline mr-3" /> Déconnexion</span>

            </div>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
