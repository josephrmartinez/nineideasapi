const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');

// Define the API routes related to topics
router.post('/', topicController.createTopic);
router.get('/', topicController.getAllTopics);
router.get('/:id', topicController.getTopicById);
router.put('/:id', topicController.updateTopic);
router.delete('/:id', topicController.deleteTopic);

// More topic-related routes if needed...

module.exports = router;