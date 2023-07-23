const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define the API routes related to users
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

// More user-related routes if needed...

module.exports = router;
