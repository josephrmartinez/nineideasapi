const mongoose = require('mongoose');
const { Schema } = mongoose;

const TopicSchema = new Schema({
  name: { type: String, required: true, unique: true },
  public: { type: Boolean, default: true },
});


// Export model
module.exports = mongoose.model("Topic", TopicSchema);
