import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importez useNavigate
import axios from "axios";
import logo from './assets/computer.jpg'
import { FaUser, FaUserCircle } from "react-icons/fa";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // État pour le message d'erreur
  const navigate = useNavigate(); // Initialiser useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/users/login', {
        email,
        mot_de_passe: motDePasse,
      });

      // Sauvegarder le token ou l'utilisateur dans le localStorage ou un état global si nécessaire
      localStorage.setItem('token', response.data.token); // Stocker le token

      // Rediriger vers le tableau de bord
      navigate('/dashboard');
    } catch (error) {
      // Vérifier si une réponse d'erreur existe et mettre à jour le message d'erreur
      if (error.response && error.response.status === 401) {
        setErrorMessage('Email ou mot de passe incorrect'); // Message d'erreur pour connexion échouée
      } else {
        setErrorMessage('Une erreur est survenue. Veuillez réessayer.'); // Message d'erreur générique
      }
      console.error('Erreur lors de la connexion:', error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center">
      <div className="w-[1000px] h-[700px] rounded-lg shadow-lg p-10 flex flex-col md:flex-row justify-between items-center md:space-x-20" style={{ backgroundColor: "#08142A" }}>
        {/* Logo */}
        <div className="flex justify-between items-start h-72 w-72 ml-16">
          <img
            src={logo}
            alt="Computer Store"
            className="h-full w-full object-contain"
          />
        </div>

        {/* Texte d'accueil */}
        <div className="justify-between items-center mb-4 md:mb-0 space-y-20 ">
          <div className="flex items-center">
          <FaUserCircle className="text-center w-24 h-24 text-white-500"/>
          <h1 className="text-white text-center text-4xl mb-4 ml-8">Se Connecter</h1>
          </div>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-pink-600"
                style={{ backgroundColor: "#060F1F" }}
                value={email} // Lier l'input à l'état
                onChange={(e) => setEmail(e.target.value)} // Mettre à jour l'état
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Mot de passe"
                className="w-full p-3 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-pink-600"
                style={{ backgroundColor: "#060F1F" }}
                value={motDePasse} // Lier l'input à l'état
                onChange={(e) => setMotDePasse(e.target.value)} // Mettre à jour l'état
              />
            </div>
            {/* Afficher le message d'erreur ici */}
            {errorMessage && (
              <div className="text-red-500 mb-4">{errorMessage}</div>
            )}
            <div className="mb-8">
              <button type="submit" className="w-full p-3 bg-pink-600 rounded-lg text-white font-bold hover:bg-pink-900 transition duration-300 flex justify-between items-center">
                Se Connecter
                <span className="ml-2 text-2xl font-bold">→</span>
              </button>

              <p className="text-gray-400 mt-2 p-1 text-center">
                Vous n'avez pas de compte ?{" "}
                <a href="./" className="text-pink-500 hover:underline">
                  Contacter un Administrateur
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
