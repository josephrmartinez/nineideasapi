const express = require('express');
const router = express.Router();
const ideaController = require('../controllers/ideaController');

// Define the API routes related to topics
router.post('/', ideaController.createIdea);
// router.get('/', ideaController.getAllIdeas);
// router.get('/new', ideaController.getNewIdea);
// router.get('/:id', ideaController.getIdeaById);
// router.delete('/:id', ideaController.deleteIdea);

module.exports = router;