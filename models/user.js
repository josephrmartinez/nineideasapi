const mongoose = require("mongoose");
const { DateTime } = require("luxon")

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true, minLength: 3, maxLength: 30 },
  password: { type: String, required: true, minLength: 3 },
  createdAt: { type: Date, default: Date.now },
  bio: { type: String, maxLength: 42 },
  lists: [{ type: Schema.Types.ObjectId, ref: "List" }]
});

UserSchema.virtual("completedLists").get(function () {
  const completedLists = this.lists.filter(list => list.completed);
  return completedLists.length;
});


UserSchema.virtual("currentStreak").get(function () {
  const sortedCompletedListDates = this.lists
    .filter(list => list.dateCompleted)
    .map(list => new Date(list.dateCompleted).getTime()) // Convert to timestamps
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort((a, b) => a - b) // Compare timestamps
    .map(timestamp => new Date(timestamp).toISOString()); // Convert back to date strings
  

  function countConsecutiveDates(dates) {
    if (dates.length === 0) {
      return 0; // No streak if there are no dates
    }
  
    // Get the current date
    const currentDate = new Date();
  
    let count = 0; // Initialize count
  
    // Iterate through the dates from most recent to oldest
    for (let index = dates.length - 1; index >= 0; index--) {
      if (isSameDay(dates[index], currentDate)) {
        count++;
      } else {
        break; // Stop counting when a non-consecutive date is encountered
      }
      currentDate.setDate(currentDate.getDate() - 1); // Move to the previous day
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

  console.log("sortedCompletedListDates:", sortedCompletedListDates)

  const currentStreak = countConsecutiveDates(sortedCompletedListDates)
  
  return currentStreak;
  
});

UserSchema.virtual("recordStreak").get(function () {
  // Function to calculate the streak for a given list of completed lists
  // function calculateStreak(completedLists) {
  //   let count = 0;
  //   let maxStreak = 0;
  //   let lastCompletedListDate = new Date(completedLists[completedLists.length - 1].timeCompleted);
  //   lastCompletedListDate.setHours(0, 0, 0, 0);

  //   for (let i = completedLists.length - 2; i >= 0; i--) {
  //     const previousDate = new Date(completedLists[i].timeCompleted);
  //     previousDate.setHours(0, 0, 0, 0);
  //     const timeDifference = lastCompletedListDate - previousDate;

  //     if (timeDifference <= 24 * 60 * 60 * 1000) {
  //       count++;
  //     } else {
  //       if (count > maxStreak) {
  //         maxStreak = count;
  //       }
  //       count = 0;
  //     }

  //     lastCompletedListDate = previousDate;
  //   }

  //   if (count > maxStreak) {
  //     maxStreak = count;
  //   }

  //   return maxStreak;
  // }

  // const completedLists = this.lists.filter((list) => list.completed);
  // completedLists.sort((a, b) => {
  //   const dateA = new Date(a.timeCompleted);
  //   const dateB = new Date(b.timeCompleted);
  //   return dateA - dateB;
  // });

  // const recordStreak = calculateStreak(completedLists);

  // return recordStreak;

  return 3
});



// Export model
module.exports = mongoose.model("User", UserSchema);
