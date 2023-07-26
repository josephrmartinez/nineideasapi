const mongoose = require('mongoose');
const { Schema } = mongoose;

const TopicSchema = new Schema({
  name: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" }
});

const Topic = mongoose.model('Topic', TopicSchema);

module.exports = Topic;