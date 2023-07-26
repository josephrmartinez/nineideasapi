const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');
const commentController = require('../controllers/commentController');

// Define the API routes related to lists
router.post('/', listController.createList);
router.get('/', listController.getAllLists);
router.get('/:listid', listController.getListById);
router.put('/:listid', listController.updateList);
router.delete('/:listid', listController.deleteList);
router.get('/:listid/comments', commentController.getCommentsForList)
router.post('/:listid/comments', commentController.createComment)

// More list-related routes if needed...

module.exports = router;