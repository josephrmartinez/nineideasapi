const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');

// Define the API routes related to topics
router.post('/', topicController.createTopic);
// router.get('/', topicController.getAllTopics);
// router.get('/new', topicController.getNewTopic);
// router.get('/:id', topicController.getTopicById);
router.delete('/:id', topicController.deleteTopic);

module.exports = router;