const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware, requireRole } = require('../middlewares/authMiddleware');

// Auth routes
router.post('/login', userController.login);
router.post('/register', userController.register);
// Admin routes
router.get('/', authMiddleware, requireRole('Administrateur'), userController.getAllUsers);
router.get('/:id', authMiddleware, requireRole('Administrateur'), userController.getUserById);
router.put('/:id', authMiddleware, requireRole('Administrateur'), userController.updateUser);
router.delete('/:id', authMiddleware, requireRole('Administrateur'), userController.deleteUser);

module.exports = router;