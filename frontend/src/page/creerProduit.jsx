import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import Header from '../composant/Header/header';
import Sidebar from '../composant/sidebar/sidebar';
import { useParams } from 'react-router-dom';

const CreateProduct = () => {
  const {idProduit} = useParams();
  const [Loading, setLoading] = useState(true);
  const [isTouchScreen, setIsTouchScreen] = useState(false);
  const [product, setProduct] = useState(false);
  const [isKeyboardRGB, setIsKeyboardRGB] = useState(false);
  const [category, setCategory] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isEditMode, setIsEditMode]= useState(false);
  const [newForm, setNewForm] = useState({
    nom: '',
    description: '',
    prix: '',
    quantite_en_stock: '',
    reference: '',
    couleurs_disponibles: [],
    configuration: {
      carte_graphique: '', 
      processeur: '', 
      ram: '', 
      rom: '', 
      marque: '',
      ecran: '', 
      tactile: false, 
      clavier_rgb: false, 
      type_accessoire: '', 
      compatibilite: '', 
      resolution: '', 
      type_d_impression: '', 
      vitesse_impression: ''
    }
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3001/api/products/${idProduit}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
     
      const data = response.data;
      console.log('product data fetched:', data)
      setNewForm(data);
      setCategory(data.category || '')
      console.log(response.data)

    } catch (error) {
      console.error('erreur lors de la recuperation des produits', error)
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    
      if (idProduit) {
        setIsEditMode(true);
        fetchProducts();
      } else {
        setIsEditMode(false);
      }
    
  }, [idProduit]);

  useEffect(() => {
    if (idProduit && newForm.configuration) {
      setIsTouchScreen(newForm.configuration.tactile);
      setIsKeyboardRGB(newForm.configuration.clavier_rgb);
    }
  }, [newForm.configuration])


  const handleToggleTouchScreen = () => setIsTouchScreen(!isTouchScreen);
  const handleToggleKeyboardRGB = () => setIsKeyboardRGB(!isKeyboardRGB);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the input name starts with 'configuration.'
    if (name.startsWith('configuration.')) {
        const configField = name.split('.')[1]; // Get the actual field name
        setNewForm(prevState => ({
            ...prevState,
            configuration: {
                ...prevState.configuration,
                [configField]: value // Update the specific configuration field
            }
        }));
    } else {
        setNewForm(prevState => ({ ...prevState, [name]: value }));
    }
};


  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    if (!isEditMode) {
      setNewForm(prevState => ({
        ...prevState,
        configuration: {
          carte_graphique: '', 
        processeur: '', 
        ram: '', 
        rom: '', 
        marque: '',
        ecran: '', 
        tactile: false, 
        clavier_rgb: false, 
        type_accessoire: '', 
        compatibilite: '', 
        resolution: '', 
        type_d_impression: '', 
        vitesse_impression: ''
        }
      }));
    }
  };

  const handleColorChange = (e) => {
    const selectedColors = Array.from(e.target.selectedOptions, option => option.value);
    setNewForm(prevState => ({ ...prevState, couleurs_disponibles: selectedColors }));
  };

  function logFormData(newForm) {
    for (let pair of newForm.entries()) {
      console.log(`${pair[0]}:${pair[1]}`)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const productData = new FormData();
  
    console.log('formData:', newForm);
  
    productData.append('nom', newForm.nom);
    productData.append('description', newForm.description);
    productData.append('prix', newForm.prix);
    productData.append('quantite_en_stock', newForm.quantite_en_stock);
    productData.append('categorie', category);
    productData.append('reference', newForm.reference);
    productData.append('couleurs_disponibles', newForm.couleurs_disponibles.join(','));
  
    if (selectedFile) {
      productData.append('photo1', selectedFile);
    } else {
      console.warn('aucun fichier sélectionné');
    }
  
    let configuration = {};
    console.log('formdate.configuration avant', newForm.configuration)
    switch (category) {
      case 'PC':
        configuration = {
          carte_graphique: newForm.configuration.carte_graphique,
          processeur: newForm.configuration.processeur,
          ram: newForm.configuration.ram,
          rom: newForm.configuration.rom,
          marque: newForm.configuration.marque,
          ecran: newForm.configuration.ecran,
          tactile: isTouchScreen,
          clavier_rgb: isKeyboardRGB,
        };
        break;
      case 'Telephone':
        configuration = {
          processeur: newForm.configuration.processeur,
          ram: newForm.configuration.ram,
          rom: newForm.configuration.rom,
          marque: newForm.configuration.marque,
        };
        break;
      case 'Imprimante':
        configuration = {
          type_d_impression: newForm.configuration.type_d_impression,
          vitesse_impression: newForm.configuration.vitesse_impression,
          resolution: newForm.configuration.resolution,
          marque: newForm.configuration.marque,
        };
        break;
      case 'Accessoire':
        configuration = {
          marque: newForm.configuration.marque,
          type_accessoire: newForm.configuration.type_accessoire,
          compatibilite: newForm.configuration.compatibilite,
        };
        break;
      default:
        console.warn('catégorie inconnue');
        break;
    }
  
    const configData = JSON.stringify(configuration);
    productData.append('configuration', configData);
  
    // Log après avoir ajouté toutes les données au FormData
    logFormData(productData);
  
    try {
      const token = localStorage.getItem('token');
      const url = isEditMode
      ? `http://localhost:3001/api/products/${newForm.idProduit}`
      : `http://localhost:3001/api/products/`

      const method = isEditMode ? 'put' : 'post';
  
      console.log('voici la configuration', configuration);
      console.log('formdata avant:', newForm);
      console.log('productdata avant:', productData);
  
      const response = await axios({
        method: method,
        url: url,
        data: productData,
        headers: {
          
          'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data'
        },
      });
  
      console.log('formdata apres:', newForm);
      console.log('configuration après', configuration);
      console.log('productdata après:', productData);
      console.log(`${isEditMode ? 'produit modifier avec succes' : 'produit creer avec succes'}`, response.data);
  
      // Reset form after submission
      setNewForm({
        nom: '',
        description: '',
        prix: '',
        quantite_en_stock: '',
        reference: '',
        couleurs_disponibles: [],
        configuration: {
          carte_graphique: '', 
          processeur: '', 
          ram: '', 
          rom: '', 
          marque: '',
          ecran: '', 
          tactile: false, 
          clavier_rgb: false, 
          type_accessoire: '', 
          compatibilite: '', 
          resolution: '', 
          type_d_impression: '', 
          vitesse_impression: ''
        },
      });
  
      setSelectedFile(null); // Réinitialisez l'entrée de fichier
  
    } catch (error) {
      console.error('Erreur lors de la création du produit:', error);
    }
  };
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!['image/jpg', 'image/jpeg', 'image/png'].includes(file.type)) {
        alert('Veuillez choisir une image au format JPG, JPEG ou PNG');
        return;
      }
      if (file.size > 10 * 1024 * 1024) { // Limit to 5MB
        alert('Le fichier est trop volumineux. Max: 10MB');
        return;
      }
      setSelectedFile(file);
    }
  };


    return (
      <div className="h-screen flex flex-col" style={{ backgroundColor: '#030C1B' }}>
        <Header />
        <div className="flex">
          <Sidebar />
          <div className="flex-1 overflow-y-auto p-6 pt-20 pl-64 ml-6 mb-6" style={{ backgroundColor: '#030C1B' }}>
            <form onSubmit={handleSubmit}>
              <div className="p-6 mb-6">
                <div className='flex justify-between'>
                  <h1 className='text-white text-3xl font-bold'>{isEditMode ? "Details de toutes les produits" : "Ajouter un Produit" }</h1>
                  <button type="submit" className="items-right px-4 py-2 ml-2 mb-10 bg-red-800 text-white rounded-lg">
                    <p className="ml-2">{isEditMode ? "Modifier" : "Creer"}</p>
                  </button>
                </div>
                <div className='grid grid-cols-2 gap-8 mb-6 text-white'>
                  <div>
                    <div className="mt-4">
                      <label>Reference</label>
                      <input className='w-full p-2' style={{ backgroundColor: '#041122' }} type="text" 
                        name="reference" value={newForm.reference} onChange={handleInputChange} />
                    </div>
                    <div className="mt-4">
                      <label>Quantité</label>
                      <input className='w-full p-2' style={{ backgroundColor: '#041122' }} type="number"
                        name="quantite_en_stock" value={newForm.quantite_en_stock} onChange={handleInputChange} />
                    </div>
                    <div className="mt-4">
                      <label>Nom du produit</label>
                      <input className='w-full p-2' style={{ backgroundColor: '#041122' }} type="text"
                        name="nom" value={newForm.nom} onChange={handleInputChange} />
                    </div>
                    <div className="mt-4">
                      <label>Prix du produit</label>
                      <input className='w-full p-2' style={{ backgroundColor: '#041122' }} type="number" 
                        name="prix" value={newForm.prix} onChange={handleInputChange} />
                    </div>
                    <div className="mt-4">
                      <label>Description</label>
                      <textarea className='w-full p-2' style={{ backgroundColor: '#041122' }} 
                        name="description" value={newForm.description} onChange={handleInputChange} />
                    </div>
                    <div className="mt-4">
                      <label>Image du produit</label>
                      {newForm.photo1 ? (
                        <img src={`http://localhost:3001/uploads/${newForm.photo1}`} alt="produit" className="h-12 w-12" />
                      ) : (
                        <input type="file" className="w-15 p-2" accept="image/png, image/jpeg" onChange={handleImageChange} />
                      )}
                     
                    </div>
                    <div className="mt-4">
                    <label>Couleurs Disponibles</label>
                      {newForm.couleurs_disponibles && newForm.couleurs_disponibles.length > 0 ? (
                          <ul className='w-full p-2 text-xl' style={{ backgroundColor: '#041122' }} >
                          {newForm.couleurs_disponibles.map((couleur, index) => (
                            <li key={index} style={{ color: couleur }}>{couleur}</li>
                          ))}
                          </ul>
                      ) : (
                        
                        <select multiple onChange={handleColorChange} className="w-full p-2" style={{ backgroundColor: '#041122' }}>
                          <option value="rouge">Rouge</option>
                          <option value="vert">Vert</option>
                          <option value="bleu">Bleu</option>
                          <option value="noir">Noir</option>
                          <option value="blanc">Blanc</option>
                        </select>
                      )}
                      
                      
                    </div>
                  </div>
                  <div>
                    {!isEditMode && (
                          <div className="mt-4">
                          <label>Catégorie</label>
                          <select  value={category} onChange={handleCategoryChange} className="w-full p-2" style={{ backgroundColor: '#041122' }}>
                            <option value="">Sélectionnez une catégorie</option>
                            <option value="PC">PC</option>
                            <option value="Telephone">Téléphone</option>
                            <option value="Imprimante">Imprimante</option>
                            <option value="Accessoire">Accessoire</option>
                          </select>
                        </div>
                    )}
                    
                    {/* Conditional Rendering for Configuration */}
                    {isEditMode && category === 'PC' &&  (
                      <>
                        <div className="mt-4">
                          <label>Carte Graphique</label>
                          <input className='w-full p-2' style={{ backgroundColor: '#041122' }} type="text"
                            name="configuration.carte_graphique" value={newForm.configuration.carte_graphique || ''} 
                            onChange={handleInputChange} />
                        </div>
                        <div className="mt-4">
                          <label>Processeur</label>
                          <input className='w-full p-2' style={{ backgroundColor: '#041122' }} type="text"
                            name="configuration.processeur" value={newForm.configuration.processeur || ''} 
                            onChange={handleInputChange} />
                        </div>
                        <div className="mt-4">
                          <label>RAM</label>
                          <input className='w-full p-2' style={{ backgroundColor: '#041122' }} type="text"
                            name="configuration.ram" value={newForm.configuration.ram || ''} 
                            onChange={handleInputChange} />
                        </div>
                        <div className="mt-4">
                          <label>ROM</label>
                          <input className='w-full p-2' style={{ backgroundColor: '#041122' }} type="text"
                            name="configuration.rom" value={newForm.configuration.rom || ''} 
                            onChange={handleInputChange} />
                        </div>
                        <div className="mt-4">
                          <label>Marque</label>
                          <input className='w-full p-2' style={{ backgroundColor: '#041122' }} type="text"
                            name="configuration.marque" value={newForm.configuration.marque || ''} 
                            onChange={handleInputChange} />
                        </div>
                        <div className="mt-4">
                          <label>Écran</label>
                          <input className='w-full p-2' style={{ backgroundColor: '#041122' }} type="text"
                            name="configuration.ecran" value={newForm.configuration.ecran || ''} 
                            onChange={handleInputChange} />
                        </div>
                        <div className="mt-4 flex items-center">
                          <input type="checkbox" checked={isTouchScreen} onChange={handleToggleTouchScreen} />
                          <label className="ml-2">Écran Tactile</label>
                        </div>
                        <div className="mt-4 flex items-center">
                          <input type="checkbox" checked={isKeyboardRGB} onChange={handleToggleKeyboardRGB} />
                          <label className="ml-2">Clavier RGB</label>
                        </div>
                        <div>
                        </div>
                      </>
                    )}
                    {isEditMode  && category === 'Telephone' && (
                      <>
                        <div className="mt-4">
                          <label>Processeur</label>
                          <input className='w-full p-2' style={{ backgroundColor: '#041122' }} type="text"
                            name="configuration.processeur" value={newForm.configuration.processeur || ''} 
                            onChange={handleInputChange} />
                        </div>
                        <div className="mt-4">
                          <label>RAM</label>
                          <input className='w-full p-2' style={{ backgroundColor: '#041122' }} type="text"
                            name="configuration.ram" value={newForm.configuration.ram || ''} 
                            onChange={handleInputChange} />
                        </div>
                        <div className="mt-4">
                          <label>ROM</label>
                          <input className='w-full p-2' style={{ backgroundColor: '#041122' }} type="text"
                            name="configuration.rom" value={newForm.configuration.rom || ''} 
                            onChange={handleInputChange} />
                        </div>
                        <div className="mt-4">
                          <label>Marque</label>
                          <input className='w-full p-2' style={{ backgroundColor: '#041122' }} type="text"
                            name="configuration.marque" value={newForm.configuration.marque || ''} 
                            onChange={handleInputChange} />
                        </div>
                      </>
                    )}
                    {isEditMode && category === 'Imprimante' && (
                      <>
                        <div className="mt-4">
                          <label>Type Imprimante</label>
                          <input className='w-full p-2' style={{ backgroundColor: '#041122' }} type="text"
                            name="configuration.type_d_impression" value={newForm.configuration.type_d_impression || ''} 
                            onChange={handleInputChange} />
                        </div>
                        <div className="mt-4">
                          <label>Vitesse d'Impression</label>
                          <input className='w-full p-2' style={{ backgroundColor: '#041122' }} type="text"
                            name="configuration.vitesse_impression" value={newForm.configuration.vitesse_impression || ''} 
                            onChange={handleInputChange} />
                        </div>
                        <div className="mt-4">
                          <label>Marque</label>
                          <input className='w-full p-2' style={{ backgroundColor: '#041122' }} type="text"
                            name="configuration.marque" value={newForm.configuration.marque || ''} 
                            onChange={handleInputChange} />
                        </div>
                        <div className="mt-4">
                          <label>Resolution</label>
                          <input className='w-full p-2' style={{ backgroundColor: '#041122' }} type="text"
                            name="configuration.resolution" value={newForm.configuration.resolution || ''} 
                            onChange={handleInputChange} />
                        </div>
                      </>
                    )}
                    {isEditMode && category === 'Accessoire' && (
                      <>
                      <div className="mt-4">
                          <label>Marque</label>
                          <input className='w-full p-2' style={{ backgroundColor: '#041122' }} type="text"
                            name="configuration.marque" value={newForm.configuration.marque || ''} 
                            onChange={handleInputChange} />
                        </div>
                        <div className="mt-4">
                          <label>Type Accessoire</label>
                          <input className='w-full p-2' style={{ backgroundColor: '#041122' }} type="text"
                            name="configuration.type_accessoire" value={newForm.configuration.type_accessoire || ''} 
                            onChange={handleInputChange} />
                        </div>
                        <div className="mt-4">
                          <label>Compatibilité</label>
                          <input className='w-full p-2' style={{ backgroundColor: '#041122' }} type="text"
                            name="configuration.compatibilite" value={newForm.configuration.compatibilite || ''} 
                            onChange={handleInputChange} />
                        </div>


                          
                        
                      </>
                      
                    )}

                            
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  
    
};

export default CreateProduct;
