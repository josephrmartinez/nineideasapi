const express = require('express');
const router = express.Router();
const userTopicController = require('../controllers/userTopicController');

// Define the API routes related to topics
router.post('/', userTopicController.createTopic);
// router.get('/', topicController.getAllTopics);
// router.get('/new', topicController.getNewTopic);
// router.get('/:id', topicController.getTopicById);
router.delete('/:id', userTopicController.deleteTopic);

module.exports = router;