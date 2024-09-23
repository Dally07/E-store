import React, { useState } from 'react';
import Header from '../Header/header';
import Sidebar from '../sidebar/sidebar';

const CreateProduct = () => {
  const [isTouchScreen, setIsTouchScreen] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [category, setCategory] = useState('');
  const [selectedFile, setSelectedFile] =useState(null)

  const handleToggle = () => {
    setIsTouchScreen(!isTouchScreen);
  };

  const handleToggle2 = () => {
    setIsTouch(!isTouch);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        if (!['image/jpg', 'image/jpeg', 'image/png'].includes(file.type)) {
            alert('veuillez choisir une imae au format JPG, JPEG ou PNG');
            return;
        }
        console.log('fichier selectioner:', file.name);

        setSelectedFile(file)
    }
}

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: '#030C1B' }}>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 overflow-y-auto p-6 pt-20 pl-64 ml-6 mb-6" style={{ backgroundColor: '#030C1B' }}>
          <div className=" p-6 mb-6">
            <div className='flex justify-between'>
              <h1 className='text-white text-3xl font-bold'>Ajouter une Produit</h1>
              <button className=" items-right  px-4 py-2 ml-2 mb-10 bg-red-800 text-white rounded-lg">
                <p className="ml-2">Enregistrer</p>
              </button>
            </div>
            <div className='grid grid-cols-2 gap-8 mb-6 text-white'>
              <div>
                <div className="mt-4">
                  <label>Reference</label>
                  <input className='w-full p-2' style={{ backgroundColor: '#041122' }} type="text" />
                </div>
                <div className="mt-4">
                  <label>Quantite</label>
                  <input className='w-full p-2' style={{ backgroundColor: '#041122' }} type="number" />
                </div>
                <div className="mt-4">
                  <label>Nom du produit</label>
                  <input className='w-full p-2' style={{ backgroundColor: '#041122' }} type="text" />
                </div>
                <div className="mt-4">
                  <label>Prix du produit</label>
                  <input className='w-full p-2' style={{ backgroundColor: '#041122' }} type="text" />
                </div>
                <div className="mt-4">
                  <label>Description</label>
                  <input className='w-full h-xl p-2' style={{ backgroundColor: '#041122' }} type="text" />
                </div>
                <div className="mt-4">
                  <label>Couleur</label>
                  <select className='w-full p-2' style={{ backgroundColor: '#041122' }} name="" id="">
                    <option value="">Noire</option>
                    <option value="">Noire</option>
                    <option value="">Noire</option>
                  </select>
                </div>
                <div className="flex mt-4">
                
                    {/* Input de fichier masqué */}
                        <input type="file" accept=".jpg, .jpeg, .png" onChange={handleImageChange} className="hidden" id="imageUpload"/>

                            {/* Zone cliquable pour simuler l'input de fichier */}
                            <label htmlFor="imageUpload"  className="w-32 h-32 border-2 border-dashed border-gray-500 flex items-center justify-center cursor-pointer">
                                {/* Si un fichier est sélectionné, affichez l'aperçu de l'image */}
                                    {selectedFile ? (
                                        <img src={URL.createObjectURL(selectedFile)} alt="Aperçu de l'image" className="w-32 h-32 cover rouunded"/>
                                    ) : (
                                <span className="text-white text-center text-sm">image du produit au format jpg, png, jpeg</span>
                                        )}
                            </label>

                        <input type="file" accept=".jpg, .jpeg, .png" onChange={handleImageChange} className="hidden" id="imageUpload"/>

                                    {/* Zone cliquable pour simuler l'input de fichier */}
                                    <label htmlFor="imageUpload"  className="w-32 h-32 border-2 border-dashed border-gray-500 flex items-center justify-center cursor-pointer ml-4">
                                        {/* Si un fichier est sélectionné, affichez l'aperçu de l'image */}
                                            {selectedFile ? (
                                                <img src={URL.createObjectURL(selectedFile)} alt="Aperçu de l'image" className="w-32 h-32 cover rouunded"/>
                                                            ) : (
                                                <span className="text-white text-center text-sm">image du produit au format jpg, png, jpeg</span>
                                                                )}
                                    </label>

                        <input type="file" accept=".jpg, .jpeg, .png" onChange={handleImageChange} className="hidden" id="imageUpload"/>

                            {/* Zone cliquable pour simuler l'input de fichier */}
                            <label htmlFor="imageUpload"  className="w-32 h-32 border-2 border-dashed border-gray-500 flex items-center justify-center cursor-pointer ml-4">
                                {/* Si un fichier est sélectionné, affichez l'aperçu de l'image */}
                                    {selectedFile ? (
                                        <img src={URL.createObjectURL(selectedFile)} alt="Aperçu de l'image" className="w-32 h-32 cover rouunded"/>
                                    ) : (
                                <span className="text-white text-center text-sm">image du produit au format jpg, png, jpeg</span>
                                        )}
                            </label>

                </div>
              </div>

              <div>
                {/* Sélection de la catégorie */}
                <div className="mt-4">
                  <label>Catégorie</label>
                  <select className='w-full p-2' style={{ backgroundColor: '#041122' }} value={category} onChange={handleCategoryChange}>
                    <option value="">Sélectionner une catégorie</option>
                    <option value="PC">PC</option>
                    <option value="Telephone">Téléphone</option>
                    <option value="Printer">Imprimante</option>
                    <option value="Accessory">Accessoire</option>
                  </select>
                </div>
                 {/* Champs conditionnels en fonction de la catégorie */}
                 {category === "PC" ? (
                  <>
                    <div className="mt-4">
                      <label>Processeur</label>
                      <input className='w-full p-2' style={{ backgroundColor: '#041122' }} type="text" />
                    </div>
                    <div className="mt-4">
                  <label>Marque</label>
                  <input className='w-full p-2' style={{ backgroundColor: '#041122' }} type="text" />
                </div>
                <div className="mt-4">
                  <label>Carte graphique</label>
                  <input className='w-full p-2' style={{ backgroundColor: '#041122' }} type="text" />
                </div>
                <div className="mt-4">
                  <label>RAM</label>
                  <input className='w-full p-2' style={{ backgroundColor: '#041122' }} type="text" />
                </div>
                <div className="mt-4">
                  <label>ROM</label>
                  <input className='w-full p-2' style={{ backgroundColor: '#041122' }} type="text" />
                </div>
                <div className="mt-4">
                  <label>Ecran</label>
                  <input className='w-full p-2' style={{ backgroundColor: '#041122' }} type="text" />
                </div>

                {/* Toggle Tactile */}
                <div className="flex items-center mt-4">
                  <div className='flex items-center'>
                    <span>{isTouchScreen ? 'tactile' : 'non tactile'}</span>
                    <label className="relative inline-flex items-center cursor-pointer ml-2">
                      <input
                        type="checkbox"
                        checked={isTouchScreen}
                        onChange={handleToggle}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {/* Toggle Clavier */}
                  <div className='flex items-center'>
                    <span className='ml-12'>{isTouch ? 'clavier retro-eclairer' : 'clavier non retro-eclairer'}</span>
                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                      <input
                        type="checkbox"
                        checked={isTouch}
                        onChange={handleToggle2}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
                  </>
                ) :category === "Telephone" ? (
                    <>
                      <div className="mt-4">
                        <label>Processeur</label>
                        <input className='w-full p-2' style={{ backgroundColor: '#041122' }} type="text" />
                      </div>
                      <div className="mt-4">
                    <label>Marque</label>
                    <input className='w-full p-2' style={{ backgroundColor: '#041122' }} type="text" />
                  </div>
                  <div className="mt-4">
                    <label>RAM</label>
                    <input className='w-full p-2' style={{ backgroundColor: '#041122' }} type="text" />
                  </div>
                  <div className="mt-4">
                    <label>ROM</label>
                    <input className='w-full p-2' style={{ backgroundColor: '#041122' }} type="text" />
                  </div>
                  
  
                    </>
                  ) : category === "Printer" ? (
                    <>
                    <div className="mt-4">
                    <label> <main>Marque</main></label>
                    <input className='w-full p-2' style={{ backgroundColor: '#041122' }} type="text" />
                  </div>
                  <div className="mt-4">
                    <label>Vitesse</label>
                    <input className='w-full p-2' style={{ backgroundColor: '#041122' }} type="text" />
                  </div>
                  <div className="mt-4">
                    <label>Type</label>
                    <input className='w-full p-2' style={{ backgroundColor: '#041122' }} type="text" />
                  </div>
                  <div className="mt-4">
                    <label>Resolution</label>
                    <input className='w-full p-2' style={{ backgroundColor: '#041122' }} type="text" />
                  </div>
                  </>
                  
                ) : category === "Accessory" ? (
                  <>
                    <div className="mt-4">
                      <label>Marque</label>
                      <input className='w-full p-2' style={{ backgroundColor: '#041122' }} type="text" />
                    </div>
                    <div className="mt-4">
                      <label>Compatibilité</label>
                      <input className='w-full p-2' style={{ backgroundColor: '#041122' }} type="text" />
                    </div>
                    <div className="mt-4">
                      <label>Type</label>
                      <input className='w-full p-2' style={{ backgroundColor: '#041122' }} type="text" />
                    </div>
                  </>
                ) : null}
                

                

               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
