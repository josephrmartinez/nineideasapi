const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommonTopicSchema = new Schema({
    type: {
      type: String,
      enum: ['Topic', 'UserTopic'],
      required: true,
    },
    reference: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: 'type',
    },
  });
  
  
  // Create model for 'CommonTopic'
 module.exports = mongoose.model("CommonTopic", CommonTopicSchema);
  