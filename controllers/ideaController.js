const asyncHandler = require('express-async-handler');
const Idea = require('../models/idea');

const ideaController = {
  createIdea: asyncHandler(async (req, res) => {
    // Implement logic to create a new topic based on the request data
    const newIdea = new Idea({ 
        text: req.body.text,
        parentTopic: req.body.parentTopic });
    // Save the new topic to the database
    await newIdea.save();
    // Respond with the created topic details
    res.status(201).json(newIdea);
  }),

  updateIdeaById: asyncHandler(async (req, res) => {
    try {
      const { updates } = req.body;
  
      const updatedIdea = await Idea.updateOne(
        { _id: req.params.id },
        { $set: updates },
        { new: true }
      );
  
      if (!updatedIdea) {
        return res.status(404).json({ error: 'Idea not found' });
      }
  
      res.json(updatedIdea);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }),

}

module.exports = ideaController;