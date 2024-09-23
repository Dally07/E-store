import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Loginpage from "./LoginPage"
import Dashboard from './composant/dashboard';
import Products from './composant/product';
import Commande from './composant/commande';
import Utilisateur from './composant/utilisateur';
import Facture from './composant/facture';
import CreateProduct from './composant/creerProduit';
import InfoCommande from './composant/infoCommande';
import InfoFacture from './composant/infoFacture';
import InfoLivraison from './composant/infoLivraison';
import Client from './composant/client';

function App() {
  return (
    <Router>
      <Routes>
      
        <Route path="/login" element={<Loginpage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products/>} />
        <Route path="/commande" element={<Commande/>} />
        <Route path="/utilisateur" element={<Utilisateur/>} />
        <Route path="/facture" element={<Facture/>} />
        <Route path="/creerProduit" element={<CreateProduct/>} />
        <Route path="/infoCommande" element={<InfoCommande/>} />
        <Route path="/infoFacture" element={<InfoFacture/>} />
        <Route path="/infoLivraison" element={<InfoLivraison/>} />
        <Route path="/client" element={<Client/>} />


        
        {/*rediriger par défaut vers le login*/}
        <Route path="/" element={<Loginpage />} />
      </Routes>
    </Router>
  );
}

export default App;

