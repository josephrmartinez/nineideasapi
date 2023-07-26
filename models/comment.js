const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true, minLength: 3, maxLength: 300 },
  parentList: { type: Schema.Types.ObjectId, ref: "List", required: true },
  timestamp: { type: Date, default: Date.now },
});


// Export model
module.exports = mongoose.model("Comment", CommentSchema);
