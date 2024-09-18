import React from "react";
import logo from './assets/computer.jpg'

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center" >
      <div className="w-[1000px] h-[700px] rounded-lg shadow-lg p-10 flex flex-col md:flex-row justify-between items-center md:space-x-20" style={{backgroundColor: "#08142A"}}>
        {/* Texte d'accueil */}
        <div className="justify-between items-center mb-6 md:mb-0 space-y-20 ">
          <h1 className="text-white text-4xl mb-6">BONJOUR A VOUS !</h1>
          <form className="space-y-4">
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-pink-600"
                style={{backgroundColor: "#060F1F"}}
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Mot de passe"
                className="w-full p-3 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-pink-600"
                style={{backgroundColor: "#060F1F"}}
              />
            </div>
            <div className="mb-8">
            <button className="w-full p-3 bg-pink-600 rounded-lg text-white font-bold hover:bg-pink-900 transition duration-300 flex justify-between items-center">
              Se Connecter
              <span className="ml-2">→</span>
            </button>

            <p className="text-gray-400 mt-2 p-1 text-center">
            Vous n'avez pas de compte ?{" "}
            <a href="./" className="text-pink-500 hover:underline">
              Veuillez creer un
            </a>
          </p>
            </div>

            
          </form>
          
        </div>

        {/* Logo */}
        <div className="flex justify-between items-start h-72 w-72 ml-16">
          <img
            src={logo}
            alt="Computer Store"
            className=" h-full w-full object-containt"
            
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;