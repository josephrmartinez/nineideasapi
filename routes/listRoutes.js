const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');

// Define the API routes related to lists
router.post('/', listController.createList);
router.get('/', listController.getAllLists);
router.get('/:id', listController.getListById);
router.put('/:id', listController.updateList);
router.delete('/:id', listController.deleteList);

// More list-related routes if needed...

module.exports = router;