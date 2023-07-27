const mongoose = require('mongoose');
const { Schema } = mongoose;

const TopicSchema = new Schema({
  name: { type: String, required: true, unique: true }
});

const Topic = mongoose.model('Topic', TopicSchema);

module.exports = Topic;