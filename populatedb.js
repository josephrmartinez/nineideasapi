#! /usr/bin/env node

console.log(
    'This script populates your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);

  const Comment = require("./models/comment");
  const List = require("./models/list");
  const Topic = require("./models/topic");
  const User = require("./models/user");

  const lists = []
  const topics = []
  const users = []
  
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false); // Prepare for Mongoose 7
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    // await createUsers();
    // await createLists();
    await createTopics();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  async function topicCreate(name) {
    const topic = new Topic({ name: name });
    await topic.save();
    topics.push(topic);
    console.log(`Added topic: ${name}`);
  }
  
  
  async function createTopics() {
    console.log("Adding topics");
    await Promise.all([
      topicCreate("")
    ]);
  }