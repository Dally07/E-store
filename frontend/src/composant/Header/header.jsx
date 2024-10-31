import React, { useState, useEffect }  from 'react';
import { FaBars, FaBell, FaCalendarAlt, FaCircle, FaSearch, FaUserCircle } from 'react-icons/fa';
import logo from '../../assets/COMPUTER LOGO 1.png';
import axios from 'axios';
import io from 'socket.io-client'
import { jwtDecode } from 'jwt-decode';


const Header = ({ toggleSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [user, setUser] = useState({nom: '', photo: ''});
  const API_BASE_URL = 'http://localhost:3001/api/notification';
  const [socket] = useState(() => io('http://localhost:3001', {
    reconnectionAttempts: 5,
    reconnectionDelay: 2000,
    transport: ["websocket","polling"],
  }) );

useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    const decoded = jwtDecode(token);
    setUser({ nom: decoded.nom, photo: decoded.photo});
  }
}, [])

  // Fonction pour récupérer toutes les notifications
useEffect(() => {
const fetchNotifications = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/notifications`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
   setNotifications(response.data);
   setUnreadCount(response.data.filter((notif) => notif.statut === 'non lu').length);
  } catch (error) {
    console.error("Erreur lors de la récupération des notifications :", error);
    throw error;
  };
};
  fetchNotifications();

  socket.on('newOrderNotification', (newNotification) => {
    console.log('nouvelle notification:,' , newNotification)
    setNotifications((prevNotification) => [newNotification, ...prevNotification ]);
    setUnreadCount((prevUnreadCount) => prevUnreadCount + 1);
  });

  return () => {
    socket.off('newOrderNotification');
  };
}, [socket]);

// Fonction pour marquer une notification comme vue
const markNotificationAsRead = async (idNotification) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/notifications/${idNotification}/vue`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la notification :", error);
    throw error;
  }
};




  // Marquer une notification comme vue
  const handleMarkAsRead = async (idNotification) => {
    try {
      await markNotificationAsRead(idNotification);
      setNotifications(notifications.map(n => n.idNotification === idNotification ? { ...n, statut: 'Vu' } : n));
      setUnreadCount(unreadCount - 1);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la notification", error);
    }
  };

  

  // Fonction pour basculer la modal
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };


  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center p-4 text-white shadow-lg z-10 border-b-2 border-black" style={{backgroundColor: "#041122",
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
      <div className="flex items-center justify-between rounded-md " style={{backgroundColor: "#030C1B"}}>
        <input
          type="text"
          placeholder="Effectuer votre recherche ici"
          className="w-[600px] p-2 rounded focus:outline-none text-gray-100"
          style={{backgroundColor: "#030C1B"}}
        />
        <FaSearch className="text-gray-400 mr-2" />
      </div>

      <div className="flex items-center space-x-2 ">
        <div className='p-2 rounded-lg shadow-lg 'style={{backgroundColor: "#030C1B"}}><FaCalendarAlt className="cursor-pointer shadow-lg" /></div>
        <div className='p-2 rounded-lg shadow-lg relative 'style={{backgroundColor: "#030C1B"}}><FaBell className="cursor-pointer" onClick={toggleNotifications}/>
        {unreadCount > 0 && (
          <span className='absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-2 text-xs'>{unreadCount}</span>
        )}
        </div>

        <div className='p-2 shadow-lg rounded-full relative 'style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          {user.photo ? (
            <img className='rounded-full w-45 h-full' src={`http://localhost:3001/uploads/${user.photo}`} alt="user" />
          ) : (
            <span className='text-White fontbold text-2xl bg-red-800 rounded-full'style={{ width: '50px', height: '33px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              {user.nom.charAt(0).toUpperCase()}
            </span>
          )}
          </div> 
      </div>

    {/* Modal des notifications */}
    {showNotifications && (
            <div className="absolute right-4 top-16 w-80 bg-white text-white rounded-2xl shadow-9xl z-20 p-4" style={{backgroundColor: "#041129"}}>
              <h3 className="font-bold mb-4 text-center">Toutes les Notifications</h3>
              <ul className="overflow-y-auto" style={{ maxHeight: '250px', direction: 'rtl', textAlign: 'left' }}>
                {notifications.map((notif) => (
                  <li
                    key={notif.idNotification}
                    className={`flex items-center p-2 border-b text-sm border-gray-900 cursor-pointer ${notif.statut === 'Vu' ? 'text-gray-500' : 'text-white font-bold'}`}
                    onClick={() => handleMarkAsRead(notif.idNotification)}
                  >
                    <FaCircle className={`mr-2 ${notif.statut === 'Vu' ? 'text-gray-500' : 'text-green-500'}`} />
                    <div className='flex-1'>
                    
                    <p className='mr-2 text-base'>{notif.message}</p>
                    <p className='text-xs ml-4 text-gray-400'>{notif.statut}</p>
                    </div>
                    
                  </li>
                ))}
            
            
          </ul>
          <button onClick={toggleNotifications} className="mt-2 text-blue-500">Fermer</button>
        </div>
      )}
    </header>
  );
};

export default Header;
