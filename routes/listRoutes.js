const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');
const commentController = require('../controllers/commentController');

// Define the API routes related to lists
router.get('/', listController.getAllLists);
router.post('/', listController.createList);
router.get('/:id', listController.getListById);
router.put('/:id', listController.updateList);
router.patch('/:id', listController.patchUpdateList);
router.delete('/:id', listController.deleteList);
router.get('/:id/comments', commentController.getCommentsForList)
router.post('/:id/comments', commentController.createComment)
router.put('/:id/comments', commentController.updateComment)
router.delete('/:id/comments', commentController.deleteComment)


// More list-related routes if needed...

module.exports = router;