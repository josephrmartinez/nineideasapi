const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true, minLength: 3, maxLength: 100 },
  email: {type: String, unique: true, required: true },
  password: { type: String, required: true, minLength: 3, maxLength: 100 },
  createdAt: { type: Date, default: Date.now },
  bio: { type: String, maxLength: 100 },
  profilelink: { type: String, maxLength: 100 },
  lists: [{ type: Schema.Types.ObjectId, ref: "List" }]
});

UserSchema.virtual("totallists").get(function () {
  return this.lists.length();
});

UserSchema.virtual("currentstreak").get(function () {
// Write function to calculate current "streak" of writing lists
//  function countConsecutiveDates(data) {
//   let count = 1;

//   // Get the last date in the array
//   const lastDate = new Date(data[data.length - 1].dateAdded);

//   // Loop through the array backwards, starting from the second to last item
//   for (let i = data.length - 2; i >= 0; i--) {
//     const currentDate = new Date(data[i].dateAdded);

//     // Check if the current date is one day before the previous date
//     if (
//       currentDate.getDate() === lastDate.getDate() - 1
//     ) {
//       count++;
//       lastDate.setTime(currentDate.getTime()); // Update lastDate to current date
//     } else {
//       break; // Stop looping if the dates are not consecutive
//     }
//   }

//   return count;
// }

});

UserSchema.virtual("recordstreak").get(function () {
// Write function to calculate the longest consecutive streak of days with completed lists
  return this.lists.length();
});



// Export model
module.exports = mongoose.model("User", UserSchema);
