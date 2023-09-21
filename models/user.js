const mongoose = require("mongoose");

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
  function countConsecutiveDates(data) {
    if (data.length === 0) {
      return 0; // No streak if there are no completedLists
    }
  
    let count = 0;
    let lastCompletedListDate = new Date(data[data.length - 1].timeCompleted);
    lastCompletedListDate.setHours(0, 0, 0, 0); // Set time to midnight for date comparison
  
    for (let i = data.length - 2; i >= 0; i--) {
      const previousDate = new Date(data[i].timeCompleted);
      previousDate.setHours(0, 0, 0, 0); // Set time to midnight for date comparison
  
      // Calculate the date difference in milliseconds
      const timeDifference = lastCompletedListDate - previousDate;
  
      // Check if the time difference is less than or equal to 24 hours (1 day)
      if (timeDifference <= 24 * 60 * 60 * 1000) {
        count++;
      } else {
        break; // If the time difference is too large, the streak is broken
      }
  
      lastCompletedListDate = previousDate; // Update currentDate to the previous date
    }
  
    return count;
  }
  

  const completedLists = this.lists.filter(list => list.completed);


  completedLists.sort((a, b) => {
    const dateA = new Date(a.timeCompleted);
    const dateB = new Date(b.timeCompleted);
    return dateA - dateB;
  });

  const currentStreak = countConsecutiveDates(completedLists);

  return currentStreak;
});

UserSchema.virtual("recordStreak").get(function () {
  // Function to calculate the streak for a given list of completed lists
  function calculateStreak(completedLists) {
    let count = 0;
    let maxStreak = 0;
    let lastCompletedListDate = new Date(completedLists[completedLists.length - 1].timeCompleted);
    lastCompletedListDate.setHours(0, 0, 0, 0);

    for (let i = completedLists.length - 2; i >= 0; i--) {
      const previousDate = new Date(completedLists[i].timeCompleted);
      previousDate.setHours(0, 0, 0, 0);
      const timeDifference = lastCompletedListDate - previousDate;

      if (timeDifference <= 24 * 60 * 60 * 1000) {
        count++;
      } else {
        if (count > maxStreak) {
          maxStreak = count;
        }
        count = 0;
      }

      lastCompletedListDate = previousDate;
    }

    if (count > maxStreak) {
      maxStreak = count;
    }

    return maxStreak;
  }

  const completedLists = this.lists.filter((list) => list.completed);
  completedLists.sort((a, b) => {
    const dateA = new Date(a.timeCompleted);
    const dateB = new Date(b.timeCompleted);
    return dateA - dateB;
  });

  const recordStreak = calculateStreak(completedLists);

  return recordStreak;
});



// Export model
module.exports = mongoose.model("User", UserSchema);
