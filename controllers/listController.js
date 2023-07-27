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
    // Implement logic to fetch all published lists
    const lists = await List.find({ status: 'published' })
    .populate("author")
    .exec();
    // LIMIT TO 20 LISTS, IMPLEMENT PAGINATION
    res.json(lists);
  }),

  getListById: asyncHandler(async (req, res) => {
    // Implement logic to find and return a list by ID
    const list = await List.findById(req.params.id);
    // Respond with the list details
    res.json(list);
  }),

  updateList: asyncHandler(async (req, res) => {
    // Implement logic to update the list details based on the request data
    const updatedList = await List.findByIdAndUpdate(req.params.id, req.body, { new: true });
    // Respond with the updated list details
    res.json(updatedList);
  }),

  deleteList: asyncHandler(async (req, res) => {
    // Implement logic to delete the list by ID
    await List.findByIdAndDelete(req.params.id);
    // Respond with a success message
    res.json({ message: 'List deleted successfully' });
  }),
};

module.exports = listController;