import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Loginpage from "./LoginPage"
import Dashboard from './composant/dashboard';
import Products from './composant/product';
import Commande from './composant/commande';
import Utilisateur from './composant/utilisateur';

function App() {
  return (
    <Router>
      <Routes>
      
        <Route path="/login" element={<Loginpage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products/>} />
        <Route path="/commande" element={<Commande/>} />
        <Route path="/utilisateur" element={<Utilisateur/>} />


        
        {/*rediriger par défaut vers le login*/}
        <Route path="/" element={<Loginpage />} />
      </Routes>
    </Router>
  );
}

export default App;
