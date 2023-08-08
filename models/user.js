const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true, minLength: 3, maxLength: 30 },
  email: {type: String, unique: true, required: true },
  password: { type: String, required: true, minLength: 3, maxLength: 30 },
  createdAt: { type: Date, default: Date.now },
  bio: { type: String, maxLength: 30 },
  lists: [{ type: Schema.Types.ObjectId, ref: "List" }]
});

UserSchema.virtual("totallists").get(function () {
  return this.lists.length;
});

UserSchema.virtual("currentstreak").get(function () {
// Write function to calculate current "streak" of writing lists
 function countConsecutiveDates(data) {
  let count = 1;
  // Get the last date in the array
  const lastDate = new Date(data[data.length - 1].dateAdded);
  // Loop through the array backwards, starting from the second to last item
  for (let i = data.length - 2; i >= 0; i--) {
    const currentDate = new Date(data[i].dateAdded);
    // Check if the current date is one day before the previous date
    if (
      currentDate.getDate() === lastDate.getDate() - 1
        ) {
          count++;
          lastDate.setTime(currentDate.getTime()); // Update lastDate to current date
        } else {
          break; // Stop looping if the dates are not consecutive
        }
      }
      return count;
    }
  const lists = this.lists;

  // Sort the lists array based on the dateAdded property in ascending order
  lists.sort((a, b) => {
    const dateA = new Date(a.dateAdded);
    const dateB = new Date(b.dateAdded);
    return dateA - dateB;
  });

// Calculate the current streak by calling the countConsecutiveDates function
const streak = countConsecutiveDates(lists);

return streak;
});

UserSchema.virtual("recordstreak").get(function () {
  // Write function to calculate the longest consecutive streak of days with completed lists
  function countConsecutiveDates(data) {
    let count = 1;
    let maxStreak = 1;

    // Get the last date in the array
    const lastDate = new Date(data[data.length - 1].dateAdded);

    // Loop through the array backwards, starting from the second to last item
    for (let i = data.length - 2; i >= 0; i--) {
      const currentDate = new Date(data[i].dateAdded);

      // Check if the current date is one day before the previous date
      if (currentDate.getDate() === lastDate.getDate() - 1) {
        count++;
        lastDate.setTime(currentDate.getTime()); // Update lastDate to current date
      } else {
        maxStreak = Math.max(maxStreak, count);
        count = 1; // Reset the streak count if the dates are not consecutive
        lastDate.setTime(currentDate.getTime()); // Update lastDate to current date
      }
    }

    // Compare the streak after the loop in case it extends to the last element
    maxStreak = Math.max(maxStreak, count);

    return maxStreak;
  }

  const lists = this.lists;

  // Sort the lists array based on the dateAdded property in ascending order
  lists.sort((a, b) => {
    const dateA = new Date(a.dateAdded);
    const dateB = new Date(b.dateAdded);
    return dateA - dateB;
  });

  // Calculate the longest consecutive streak by calling the countConsecutiveDates function
  const streak = countConsecutiveDates(lists);

  return streak;
});



// Export model
module.exports = mongoose.model("User", UserSchema);
