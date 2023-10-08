const asyncHandler = require('express-async-handler');
const Topic = require('../models/topic');
const User = require('../models/user');

const topicController = {
  createTopic: asyncHandler(async (req, res) => {
    // console.log("createTopic req.body.name:", req.body.name)
    // Implement logic to create a new topic based on the request data
    const newTopic = new Topic({ 
      name: req.body.name,
      public: req.body.public === false ? false : true });
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

  getAllPublicTopics: asyncHandler(async (req, res) => {
    // Implement logic to fetch all topics
    const topics = await Topic.find({public: true});
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
      // Check if the user is authenticated and get the completedListTopics
      if (req.user && req.user.lists) {
        let usersExistingTopics = new Set()
        // Populate the Set with the user's list topics
        for (const list of req.user.lists) {
          usersExistingTopics.add(list.topic._id.toString());
      }
      console.log("usersExistingTopics:", usersExistingTopics)

      let newTopic;
      let startTime = Date.now(); // Record the start time to limit the do... while loop

      do {
        // Fetch a random topic
        newTopic = await Topic.aggregate([
          { $match: { public: true } },
          { $sample: { size: 1 } },
        ]);
        console.log("do...while newTopic:", newTopic)
        if (Date.now() - startTime > 3000) {
          break; // Exit the loop if it's running for more than 3 seconds
        }
      } while (usersExistingTopics.has(newTopic[0]._id.toString())); // Check if the user has written a list on this topic
      
      // Respond with the random new topic
      res.json(newTopic[0]);

      } else {
      
      let newTopic = await Topic.aggregate([
        { $match: { public: true } },
        { $sample: { size: 1 } },
      ]);
      res.json(newTopic[0]);
    }
    } catch (error) {
      // Handle any errors that occur during the database query or processing
      res.status(500).json({ error: error.message });
    }
  })

  

  
}

module.exports = topicController;