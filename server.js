const express = require("express")
require('dotenv').config()
const app = express()
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/user')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');

// connect to MongoDB
mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGODB_URI
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true, // Allow cookies to be sent with requests
}));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

// CURRENTLY NOT BEING USED
// Middleware to verify JWT token and set the current user (if authenticated)
const authenticateUser = (req, res, next) => {
  const token = req.cookies.accessToken; // Read the accessToken from cookies

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = decodedToken;
    } catch (error) {
      // Invalid token or expired token - do nothing, proceed without setting req.user
    }
  }

  // Continue to the next middleware or route handler
  next();
};

// Import and use the routes
const userRoutes = require('./routes/userRoutes');
const listRoutes = require('./routes/listRoutes');
const topicRoutes = require('./routes/topicRoutes');

app.use('/api/users', userRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/topic', topicRoutes)

app.listen(3000, ()=> console.log("server started!"))