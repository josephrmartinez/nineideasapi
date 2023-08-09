const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new user
router.post('/', userController.registerUser);

// User login
router.post('/login', userController.loginUser);

// // Get lists by the current user
// router.get('/current/lists', userController.getListsByCurrentUser);

// Get lists by a specific user
router.get('/:id/lists', userController.getListsByUserId);

// Get user by user ID
router.get('/:id', userController.getUserById);

// Update user by user ID
router.put('/:id', userController.updateUser);

// Delete user by user ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
