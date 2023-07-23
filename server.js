const express = require("express")
require('dotenv').config()
const app = express()
const mongoose = require('mongoose');


// connect to MongoDB
mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGODB_URI
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}




app.use(express.json())



app.listen(3000, ()=> console.log("server started!"))