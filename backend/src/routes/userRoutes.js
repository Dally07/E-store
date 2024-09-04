const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware, requireRole } = require('../middlewares/authMiddleware');

// Auth routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Admin routes
router.get('/', authMiddleware, requireRole('Admin'), userController.getAllUsers);
router.get('/:id', authMiddleware, requireRole('Admin'), userController.getUserById);
router.put('/:id', authMiddleware, requireRole('Admin'), userController.updateUser);
router.delete('/:id', authMiddleware, requireRole('Admin'), userController.deleteUser);

module.exports = router;