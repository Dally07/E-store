import React from 'react';
import { FaBars, FaBell, FaCalendarAlt, FaSearch, FaUserCircle } from 'react-icons/fa';
import logo from '../assets/COMPUTER LOGO 1.png';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white shadow" style={{backgroundColor: "#041122",
      boxShadow: "inset 50px rgba(0, 0, 0, 0.5)"
    }}>
      {/* logo et icon menu */ }
      <div className="flex items-center">
        <button className="text-white mr-4 lg:hidden" onClick={toggleSidebar}>
          <FaBars size={24} />
        </button>
        <img src={logo} alt="logo" className="h-8 w-8 mr-2" />
        <div className="text-xl font-bold text-red-600">
          COMPUTER <span className="text-white">STORE</span>
        </div>
      </div>

      {/* Barre de recherche avec un espacement de 2 cm (ml-8) */}
      <div className="flex items-center justify-between rounded-md ml-8" style={{backgroundColor: "#030C1B"}}>
        <input
          type="text"
          placeholder="Effectuer votre recherche ici"
          className="w-[600px] p-2 rounded focus:outline-none text-gray-100"
          style={{backgroundColor: "#030C1B"}}
        />
        <FaSearch className="text-gray-400 mr-2" />
      </div>

      <div className="flex items-center space-x-6">
        <FaCalendarAlt className="cursor-pointer" />
        <FaBell className="cursor-pointer" />
        <FaUserCircle className="cursor-pointer" />
      </div>

    </header>
  );
};

export default Header;
