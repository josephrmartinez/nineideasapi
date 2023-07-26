const asyncHandler = require('express-async-handler');
const Comment = require('../models/comment');

const commentController = {
  getCommentsForList: asyncHandler(async (req, res) => {
    const listId = req.params.listid;
    const comments = await Comment.find({ parentList: listId });
    res.json(comments);
  }),

  createComment: asyncHandler(async (req, res) => {
    const { author, text, parentList } = req.body;
    const comment = new Comment({
      author,
      text,
      parentList,
    });
    await comment.save();
    res.json(comment);
  }),
};

// Add more functions for updating and deleting comments if needed

module.exports = commentController;