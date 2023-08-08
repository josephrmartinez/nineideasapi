const mongoose = require('mongoose');
const { Schema } = mongoose;

const IdeaSchema = new Schema({
  text: { type: String },
  parentList: { type: Schema.Types.ObjectId, ref: "List", required: true },

});


// Export model
module.exports = mongoose.model("Idea", IdeaSchema);
