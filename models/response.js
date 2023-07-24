const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ResponseSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true, minLength: 3, maxLength: 300 },
  parentlist: { type: Schema.Types.ObjectId, ref: "List", required: true },
  timestamp: { type: Date, default: Date.now },
});


// Export model
module.exports = mongoose.model("Response", ResponseSchema);
