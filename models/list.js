const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon")

const ListSchema = new Schema({
  topic: { type: String },
  ideas: [{ type: String }],
  dateAdded: { type: Date, default: Date.now },
  timeStarted: { type: Date, default: Date.now },
  timeCompleted: {type: Date },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  visibility: { type: String, enum: ['private', 'public'], default: 'private' },
});

ListSchema.virtual("dateAdded_formatted").get(function(){
  return DateTime.fromJSDate(this.dateAdded).toLocaleString(DateTime.DATETIME_SHORT)
})


// Export model
module.exports = mongoose.model("List", ListSchema);





// Virtual for list's URL
// ListSchema.virtual("url").get(function () {
//     // We don't use an arrow function as we'll need the this object
//     return `/list/${this._id}`;
//   });


// topic: {
//   type: Schema.Types.ObjectId,
//   ref: "Topic",
//   validate: {
//     validator: async function (value) {
//       if (typeof value === 'string') {
//         // If the value is a string, try to find or create the corresponding topic
//         const existingTopic = await Topic.findOne({ name: value });
//         if (existingTopic) {
//           // If the topic exists, use its ID
//           this.topic = existingTopic._id;
//           return true;
//         } else {
//           // If the topic doesn't exist, create a new topic and use its ID
//           const newTopic = new Topic({ name: value });
//           await newTopic.save();
//           this.topic = newTopic._id;
//           return true;
//         }
//       } else if (value instanceof mongoose.Types.ObjectId) {
//         // If the value is already a valid ObjectId, it's a reference to an existing topic
//         return true;
//       } else {
//         return false; // Invalid value, neither string nor ObjectId
//       }
//     },
//     message: 'Invalid topic value.'
//   },
//   required: true
// },