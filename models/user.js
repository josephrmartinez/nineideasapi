const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true, minLength: 3, maxLength: 30 },
  email: {type: String },
  password: { type: String, required: true, minLength: 3 },
  createdAt: { type: Date, default: Date.now },
  bio: { type: String, maxLength: 30 },
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
    
    let count = 1;
    const lastDate = new Date(data[data.length - 1].timeCompleted);
    for (let i = data.length - 2; i >= 0; i--) {
      const currentDate = new Date(data[i].timeCompleted);
      if (currentDate.getDate() === lastDate.getDate() - 1) {
        count++;
        lastDate.setTime(currentDate.getTime());
      } else {
        break;
      }
    }
    return count;
  }

  const completedLists = this.lists.filter(list => list.completed);

  completedLists.sort((a, b) => {
    const dateA = new Date(a.timeCompleted);
    const dateB = new Date(b.timeCompleted);
    return dateA - dateB;
  });

  const streak = countConsecutiveDates(completedLists);

  return streak;
});

UserSchema.virtual("recordStreak").get(function () {
  function countConsecutiveDates(data) {
    if (data.length === 0) {
      return 0; // No streak if there are no completedLists
    }
    
    let count = 1;
    let maxStreak = 1;
    const lastDate = new Date(data[data.length - 1].dateAdded);

    for (let i = data.length - 2; i >= 0; i--) {
      const currentDate = new Date(data[i].dateAdded);

      if (currentDate.getDate() === lastDate.getDate() - 1) {
        count++;
        lastDate.setTime(currentDate.getTime());
      } else {
        maxStreak = Math.max(maxStreak, count);
        count = 1;
        lastDate.setTime(currentDate.getTime());
      }
    }

    maxStreak = Math.max(maxStreak, count);

    return maxStreak;
  }

  const completedLists = this.lists.filter(list => list.completed);

  completedLists.sort((a, b) => {
    const dateA = new Date(a.dateAdded);
    const dateB = new Date(b.dateAdded);
    return dateA - dateB;
  });

  const streak = countConsecutiveDates(completedLists);

  return streak;
});


// Export model
module.exports = mongoose.model("User", UserSchema);
