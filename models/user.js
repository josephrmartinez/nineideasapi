const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true, minLength: 3, maxLength: 100 },
  email: {type: String, unique: true, required: true },
  password: { type: String, required: true, minLength: 3, maxLength: 100 },
  createdAt: { type: Date, default: Date.now },
  lists: [{ type: Schema.Types.ObjectId, ref: "List" }]
});


// Export model
module.exports = mongoose.model("User", UserSchema);
