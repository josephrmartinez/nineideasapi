const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define the API routes related to users
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);
router.get('/current/lists', userController.getListsByCurrentUser); 
router.get('/:userid/lists', userController.getListsByUserId);
router.get('/:userid', userController.getUserById);
router.put('/:userid', userController.updateUser);
router.delete('/:userid', userController.deleteUser);

// More user-related routes if needed...

module.exports = router;
