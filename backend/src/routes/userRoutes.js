const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
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
// Auth routes
router.post('/login', userController.login);
router.post('/register',authMiddleware,requireRole('Administrateur'), upload.single('photo'), userController.register);
// Admin routes
router.get('/',  userController.getAllUsers);
router.get('/:id', authMiddleware, requireRole('Administrateur'), userController.getUserById);
router.put('/:id', authMiddleware, upload.single('photo'), requireRole('Administrateur'), userController.updateUser);
router.delete('/:id', authMiddleware, requireRole('Administrateur'), userController.deleteUser);

module.exports = router;