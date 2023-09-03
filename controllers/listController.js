const asyncHandler = require('express-async-handler');
const List = require('../models/list');

const listController = {
  createList: asyncHandler(async (req, res) => {
    // Implement logic to create a new list based on the request data
    const newList = new List(
      { topic: req.body.topic,
        ideas: req.body.ideas,
        author: req.user,
      });
      await newList.save()
      res.status(201).json(newList);
  }),


  getAllLists: asyncHandler(async (req, res) => {
    try {
      // Implement logic to fetch all published lists with visibility set to "public"
      const lists = await List.find({ public: true })
        .sort({ timeCompleted: -1 }) // Sort by timeCompleted in descending order
        .limit(20) // Limit the result to 20 documents
        .populate({path: "author", select: "username"})
        .populate({path: "topic", select: "name"})
        .exec();
      // Respond with the lists data
      res.json(lists);
    } catch (error) {
      // Handle any errors that occur during the database query or processing
      res.status(500).json({ error: 'An error occurred while fetching lists' });
    }
  }),


  getListById: asyncHandler(async (req, res) => {
    // Implement logic to find and return a list by ID
    const list = await List.findById(req.params.id)
      .populate({path: "author", select: "username"})
      .populate({path: "topic", select: "name"})
      .populate("comments")
      .populate("ideas")
      .exec();
    // Respond with the list details
    res.json(list);
  }),

  updateList: asyncHandler(async (req, res) => {
    // Implement logic to update the list details based on the request data
    const updatedList = await List.findByIdAndUpdate(req.params.id, req.body, { new: true });
    // Respond with the updated list details
    res.json(updatedList);
  }),


  // WHY I AM UNABLE TO UPDATE A LIST TEXT FIELD IN THIS MANNER
  // BUT I AM ABLE TO SUCCESSFULLY UPDATE THE LIST TEXT FIELD VIA THE UPDATEIDEABYID ENDPOINT
  patchUpdateList: asyncHandler(async (req, res) => {
    try {
      const { updates } = req.body;
      console.log("updates", updates)
  
      const updatedList = await List.findOneAndUpdate(
        { _id: req.params.id },
        { $set: updates },
        { new: true }
      );
  
      if (!updatedList) {
        return res.status(404).json({ error: 'Error making patch update to list' });
      }
  
      res.json(updatedList);
      console.log("updated list:", updatedList);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }),
  

  deleteList: asyncHandler(async (req, res) => {
    const list = await List.findById(req.params.id)
      .populate("author")
      .exec();

    if (list) {
      const authorId = list.author._id

      // Implement logic to delete the list by ID
      await List.findByIdAndDelete(req.params.id);
      // Respond with a success message
      res.json({ authorId });
    }
  }),
};

module.exports = listController;