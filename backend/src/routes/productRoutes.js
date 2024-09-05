const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authMiddleware, requireRole } = require('../middlewares/authMiddleware');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Renommer le fichier pour éviter les conflits de noms
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Routes pour la gestion des produits
router.post('/', authMiddleware, requireRole('Gestionnaire des produits', 'Administrateur'),upload.single('photo1'), productController.createProduct);
router.get('/', authMiddleware, productController.getAllProducts);
router.get('/:id', authMiddleware,  productController.getProductById);
router.put('/:id', authMiddleware, requireRole('Gestionnaire des produits', 'Administrateur'),upload.single('photo1'), productController.updateProduct);
router.delete('/:id', authMiddleware, requireRole('Gestionnaire des produits', 'Administrateur'), productController.deleteProduct);

module.exports = router;
