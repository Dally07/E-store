import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Loginpage from "./LoginPage"
import Dashboard from './page/dashboard';
import Products from './page/product';
import Commande from './page/commande';
import Utilisateur from './page/utilisateur';
import Facture from './page/facture';
import CreateProduct from './page/creerProduit';
import InfoCommande from './page/infoCommande';
import InfoFacture from './page/infoFacture';
import InfoLivraison from './page/infoLivraison';
import Client from './page/client';
import Rapport from './page/rapport';
import Livraison from './page/livraison';

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
        <Route path="/creerProduit/:idProduit" element={<CreateProduct/>} />
        <Route path="/infoCommande" element={<InfoCommande/>} />
        <Route path="/infoFacture" element={<InfoFacture/>} />
        <Route path="/infoLivraison" element={<InfoLivraison/>} />
        <Route path="/client" element={<Client/>} />
        <Route path="/rapport" element={<Rapport/>} />
        <Route path="/livraison" element={<Livraison/>} />


        
        {/*rediriger par défaut vers le login*/}
        <Route path="/" element={<Loginpage />} />
      </Routes>
    </Router>
  );
}

export default App;

