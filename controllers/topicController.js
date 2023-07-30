const asyncHandler = require('express-async-handler');
const Topic = require('../models/topic');
const User = require('../models/user');

const topicController = {
  createTopic: asyncHandler(async (req, res) => {
    // Implement logic to create a new topic based on the request data
    const newTopic = new Topic({ name: req.body.name });
    // Save the new topic to the database
    await newTopic.save();
    // Respond with the created topic details
    res.status(201).json(newTopic);
  }),

  getAllTopics: asyncHandler(async (req, res) => {
    // Implement logic to fetch all topics
    const topics = await Topic.find();
    // Respond with the array of topics
    res.json(topics);
  }),

  getTopicById: asyncHandler(async (req, res) => {
    // Implement logic to find and return a topic by ID
    const topic = await Topic.findById(req.params.id);
    // Respond with the topic details
    res.json(topic);
  }),

  deleteTopic: asyncHandler(async (req, res) => {
    // Implement logic to delete the topic by ID
    await Topic.findByIdAndDelete(req.params.id);
    // Respond with a success message
    res.json({ message: 'Topic deleted successfully' });
  }),

  getNewTopic: asyncHandler(async (req, res) => {
    try {
      let completedListTopics = [];
  
      // Check if the user is authenticated and get the completedListTopics
      if (req.user) {
        const currentUserID = req.user._id;
        const user = await User.findById(currentUserID).populate('lists');
        completedListTopics = user.lists.map((list) => list.topic);
      }
      // Fetch a random topic that the user has not already written a list on
      const newTopic = await Topic.aggregate([
        { $match: { name: { $nin: completedListTopics } } },
        { $sample: { size: 1 } },
      ]);
  
      if (newTopic.length === 0) {
        // If no new topics are available, respond with an appropriate message
        return res.json({ message: 'No new topics available' });
      }
  
      // Respond with the random new topic
      res.json(newTopic[0]);
    } catch (error) {
      // Handle any errors that occur during the database query or processing
      res.status(500).json({ error: error.message });
    }
  })
}

module.exports = topicController;