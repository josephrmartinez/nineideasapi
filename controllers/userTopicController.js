const asyncHandler = require('express-async-handler');
const UserTopic = require('../models/userTopic');
const User = require('../models/user');

const topicController = {
  createTopic: asyncHandler(async (req, res) => {
    console.log("createUserTopic req.body.name:", req.body.name)
    // Implement logic to create a new topic based on the request data
    const newTopic = new UserTopic({ name: req.body.name });
    // Save the new topic to the database
    await newTopic.save();
    // Respond with the created topic details
    res.status(201).json(newTopic);
  }),

//   getAllTopics: asyncHandler(async (req, res) => {
//     // Implement logic to fetch all topics
//     const topics = await Topic.find();
//     // Respond with the array of topics
//     res.json(topics);
//   }),

//   getTopicById: asyncHandler(async (req, res) => {
//     // Implement logic to find and return a topic by ID
//     const topic = await Topic.findById(req.params.id);
//     // Respond with the topic details
//     res.json(topic);
//   }),

  deleteTopic: asyncHandler(async (req, res) => {
    // Implement logic to delete the topic by ID
    await UserTopic.findByIdAndDelete(req.params.id);
    // Respond with a success message
    res.json({ message: 'Topic deleted successfully' });
  }),

}

module.exports = topicController;