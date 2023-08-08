const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon")

const ListSchema = new Schema({
  topic: { type: Schema.Types.ObjectId, required: true, ref: "Topic" },
  ideas: [{ type: Schema.Types.ObjectId, ref: "Idea" }],
  dateAdded: { type: Date, default: Date.now },
  timeStarted: { type: Date, default: Date.now },
  timeCompleted: {type: Date },
  author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  status: { type: String, enum: ['draft', 'complete'], default: 'draft' },
  visibility: { type: String, enum: ['private', 'public'], default: 'private' },
});

ListSchema.virtual("dateAdded_formatted").get(function(){
  return DateTime.fromJSDate(this.dateAdded).toLocaleString(DateTime.DATETIME_SHORT)
})


// Export model
module.exports = mongoose.model("List", ListSchema);
