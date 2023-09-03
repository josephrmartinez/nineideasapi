const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserTopicSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, default: 'UserTopic' }
});


// Export model
module.exports = mongoose.model("UserTopic", UserTopicSchema);
