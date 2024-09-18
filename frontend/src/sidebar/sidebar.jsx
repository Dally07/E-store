import React, { useState } from 'react';
import { FaBars, FaTachometerAlt, FaBoxes, FaChartLine, FaCogs, FaChevronDown, FaUser, FaLifeRing, FaDotCircle, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isVentesOpen, setIsVentesOpen] = useState(false);
  const [isInventaireOpen, setIsInventaireOpen] = useState(false);
  const [isParametreOpen, setIsParametreOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {/* Bouton du menu pour mobile */}
      <div className="md:hidden flex items-center p-4">
        <button onClick={toggleSidebar} className="text-white">
          <FaBars size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full text-white w-64 relative transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50 md:translate-x-0`}>
        <nav className="p-4 h-full justify-between" style={{backgroundColor: "#041122"}}>
          <ul>
            <li className="mb-6">
              <div className="flex justify-between cursor-pointer">
                <span><FaTachometerAlt className="inline mr-3" /> Dashboard</span>
              </div>
            </li>
            <li className="mb-6">
              <div onClick={() => setIsVentesOpen(!isVentesOpen)} className="flex justify-between cursor-pointer">
                <span><FaChartLine className="inline mr-3" /> Ventes</span>
                <FaChevronDown />
              </div>
              {isVentesOpen && (
                <ul className="ml-4 mt-2">
                  <li>Appareils</li>
                </ul>
              )}
            </li>
            <li className="mb-6">
              <div onClick={() => setIsInventaireOpen(!isInventaireOpen)} className="flex justify-between cursor-pointer">
                <span><FaBoxes className="inline mr-3" /> Inventaire</span>
                <FaChevronDown />
              </div>
              {isInventaireOpen && (
                <ul className="ml-4 mt-2">
                  <li>Appareils</li>
                </ul>
              )}
            </li>
            <li className="mb-6">
              <div className="flex justify-between cursor-pointer">
                <span><FaLifeRing className="inline mr-3" /> Rapport</span>
              </div>
            </li>
            <li className="mb-6">
              <div className="flex justify-between cursor-pointer">
                <span><FaUser className="inline mr-3" /> Client</span>
              </div>
            </li>
            <li className="mb-6">
              <div onClick={() => setIsParametreOpen(!isParametreOpen)} className="flex justify-between cursor-pointer">
                <span><FaCogs className="inline mr-3" /> Paramètres</span>
                <FaChevronDown />
              </div>
              {isParametreOpen && (
                <ul className="h-16 ml-4 mt-2 justify-center" style={{ backgroundColor: '#041122' }}>
                  <li><span><FaDotCircle className="inline mr-3" size={10} /> Utilisateur</span></li>
                  <li><span><FaDotCircle className="inline mr-3" size={10} /> Role</span></li>
                </ul>
              )}
            </li>
          </ul>
          <ul>
          <div onClick={() => setIsParametreOpen(!isParametreOpen)} className="flex justify-between cursor-pointer">
                <span><FaSignOutAlt className="inline mr-3" /> Deconnection</span>
                
              </div>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;