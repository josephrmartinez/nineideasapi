const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true, minLength: 3, maxLength: 30 },
  password: { type: String, required: true, minLength: 3 },
  createdAt: { type: Date, default: Date.now },
  bio: { type: String, maxLength: 42 },
  lists: [{ type: Schema.Types.ObjectId, ref: "List" }]
});


UserSchema.methods.calculateSortedCompletedListDates = function () {
  if (!this._sortedCompletedListDates) {
    this._sortedCompletedListDates = this.lists
      .filter(list => list.dateCompleted)
      .map(list => new Date(list.dateCompleted).getTime())
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((a, b) => a - b)
      .map(timestamp => new Date(timestamp).toISOString());
  }
  return this._sortedCompletedListDates;
};

UserSchema.virtual("completedLists").get(function () {
  const completedLists = this.lists.filter(list => list.completed);
  return completedLists.length;
});

UserSchema.virtual("currentStreak").get(function () {
  const sortedCompletedListDates = this.calculateSortedCompletedListDates();

  function countConsecutiveDates(dates) {
    if (dates.length === 0) {
      return 0; // No streak if there are no dates
    }

    // Get the last item in the date array
    const lastCompletedDate = new Date(dates[dates.length - 1]);
    console.log('lastCompletedDate', lastCompletedDate)
  
    let count = 0; // Initialize count
  
    // Iterate through the dates from most recent to oldest
    for (let index = dates.length - 1; index >= 0; index--) {
      const listDate = new Date(dates[index]);
      if (isSameDay(listDate, lastCompletedDate)) {
        count++;
      } else {
        break; // Stop counting when a non-consecutive date is encountered
      }
      lastCompletedDate.setDate(lastCompletedDate.getDate() - 1); // Move to the previous day
    }
  
    return count;
  }
  
  // Helper function to check if two Date objects are on the same day
  function isSameDay(date1, date2) {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  // console.log("sortedCompletedListDates:", sortedCompletedListDates)

  const currentStreak = countConsecutiveDates(sortedCompletedListDates)
  
  return currentStreak;
  
});

UserSchema.virtual("recordStreak").get(function () {
  const sortedCompletedListDates = this.calculateSortedCompletedListDates();

  function findLongestStreak(dates) {
    let longestStreak = 0;
    let currentStreak = 0;

    for (let i = 0; i < dates.length - 1; i++) {
      const currentDate = new Date(dates[i]);
      const nextDate = new Date(dates[i + 1]);

      // Check if the current date and the next date are consecutive days
      if (
        currentDate.getDate() === nextDate.getDate() - 1 &&
        currentDate.getMonth() === nextDate.getMonth() &&
        currentDate.getFullYear() === nextDate.getFullYear()
      ) {
        currentStreak++;
      } else {
        // Reset the current streak if dates are not consecutive
        currentStreak = 0;
      }

      // Update the longest streak if the current streak is longer
      if (currentStreak > longestStreak) {
        longestStreak = currentStreak;
      }
    }

    return longestStreak + 1; // Add 1 to include the last date in the streak
  }

  const longestStreak = findLongestStreak(sortedCompletedListDates);

  // Adjust value to return 0 if longest streak is just one. Single streaks do not count as a streak.
  if (sortedCompletedListDates.length === 0) {
    return 0
  } else {
  return longestStreak;
  }
});

// Export model
module.exports = mongoose.model("User", UserSchema);
