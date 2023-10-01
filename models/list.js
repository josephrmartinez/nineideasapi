const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  topic: { type: Schema.Types.ObjectId, required: true, ref: "Topic" },
  ideas: [{ type: Schema.Types.ObjectId, ref: "Idea" }],
  timeStarted: { type: Date },
  timeCompleted: {type: Date },
  dateCompleted: {type: Date },
  author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  completed: { type: Boolean, default: false },
  public: { type: Boolean, default: false }
});


// Export model
module.exports = mongoose.model("List", ListSchema);