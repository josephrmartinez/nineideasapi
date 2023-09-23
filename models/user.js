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
  const completedListDates = this.lists
    .filter(list => list.dateCompleted)
    .map(list => list.dateCompleted)

  // function countConsecutiveDates(dates) {
  //   if (dates.length === 0) {
  //     return 0; // No streak if there are no completedLists
  //   }
  
  // //   let count = 0;
  // //   let lastCompletedListDate = DateTime.fromISO(dates[dates.length - 1]).toFormat("MM/dd/yyyy");
  
  // //   for (let i = dates.length - 2; i >= 0; i--) {
  // //     const previousDate = new Date(dates[i]).toDateString();
  
  // //     if (lastCompletedListDate === previousDate) {
  // //       count++;
  // //     } else {
  // //       break; // If the time difference is too large, the streak is broken
  // //     }
  
  // //     lastCompletedListDate = previousDate; // Update currentDate to the previous date
  // //   }
  
  // //   return count;
  // // }
  
  // return 3
  // }
  

  // const completedListDates = this.lists.filter(list => list.dateCompleted)
  // .map(list => list.dateCompleted)
  // .filter((value, index, self) => self.indexOf(value) === index)
  // .sort((a, b) => {
  //   const dateA = new Date(a);
  //   const dateB = new Date(b);
  //   return dateA - dateB;
  // });

  console.log("completedListDates:", completedListDates)

  // const currentStreak = countConsecutiveDates(completedListDates);

  // return currentStreak;
  return 3
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
