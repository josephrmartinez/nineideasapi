const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new user
router.post('/', userController.registerUser);

// User login
router.post('/login', userController.loginUser);

// Get user by user ID
router.get('/:id', userController.getUserById);

// Update user by user ID
router.patch('/:id', userController.patchUpdateUser)

// Delete user by user ID
router.delete('/:id', userController.deleteUser);

module.exports = router;




// Get lists by a specific user. DEPRECATED?
// router.get('/:id/lists', userController.getListsByUserId);

// Update user by user ID. DEPRECATED?
// router.put('/:id', userController.updateUser);