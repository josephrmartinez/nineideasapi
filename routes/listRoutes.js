const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');

// Define the API routes related to lists
router.get('/', listController.getAllLists);
router.post('/', listController.createList);
router.get('/:id', listController.getListById);
router.put('/:id', listController.updateList);
router.patch('/:id', listController.patchUpdateList);
router.delete('/:id', listController.deleteList);


// More list-related routes if needed...

module.exports = router;