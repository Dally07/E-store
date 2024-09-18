import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Loginpage from "./LoginPage"
import Dashboard from './composant/dashboard';

function App() {
  return (
    <Router>
      <Routes>
      
        <Route path="/login" element={<Loginpage />} />
        <Route path="/dashboard" element={<Dashboard />} />


        
        {/*rediriger par défaut vers le login*/}
        <Route path="/" element={<Loginpage />} />
      </Routes>
    </Router>
  );
}

export default App;
