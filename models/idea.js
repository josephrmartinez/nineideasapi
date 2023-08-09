const mongoose = require('mongoose');
const { Schema } = mongoose;

const IdeaSchema = new Schema({
  text: { type: String },
  parentTopic: { type: Schema.Types.ObjectId, ref: "Topic", required: true },
});


// Export model
module.exports = mongoose.model("Idea", IdeaSchema);
