const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new user
router.post('/users', userController.registerUser);

// User login
router.post('/users/login', userController.loginUser);

// Get lists by the current user
router.get('/users/current/lists', userController.getListsByCurrentUser);

// Get lists by a specific user
router.get('/users/:userid/lists', userController.getListsByUserId);

// Get user by user ID
router.get('/users/:userid', userController.getUserById);

// Update user by user ID
router.put('/users/:userid', userController.updateUser);

// Delete user by user ID
router.delete('/users/:userid', userController.deleteUser);

module.exports = router;
