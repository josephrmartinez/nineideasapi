const express = require("express")
require('dotenv').config()
const app = express()
const mongoose = require('mongoose');
const cors = require('cors');


// connect to MongoDB
mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGODB_URI
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}



app.use(cors());
app.use(express.json())


// Import and use the routes
const userRoutes = require('./routes/userRoutes');
const listRoutes = require('./routes/listRoutes');
const topicRoutes = require('./routes/topicRoutes');

app.use('/api/users', userRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/topic', topicRoutes)

// Serve the static files from the React app ???
app.use(express.static(path.join(__dirname, '../nineideas-app/build')));

// If no API routes match, serve the React app ???
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../nineideas-app/build', 'index.html'));
});

app.listen(3000, ()=> console.log("server started!"))