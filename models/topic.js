const mongoose = require('mongoose');
const { Schema } = mongoose;

const TopicSchema = new Schema({
  name: { type: String, required: true, unique: true }
});


// Export model
module.exports = mongoose.model("Topic", TopicSchema);
