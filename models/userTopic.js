const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserTopicSchema = new Schema({
  name: { type: String, required: true }
});


// Export model
module.exports = mongoose.model("UserTopic", TopicSchema);
