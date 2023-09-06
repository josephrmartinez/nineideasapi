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
const mongoDB = process.env.MONGODB_URI;
const mongoDBOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'production', // Specify the database name here
};
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB, mongoDBOptions);
}

app.use(cors({
  origin: 'https://nineideas.netlify.app', // Replace with your frontend URL
  credentials: true, // Allow cookies to be sent with requests
}));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())


// Middleware to verify JWT token and set the current user (if authenticated)
const authenticateUser = (req, res, next) => {
  const token = req.cookies.accessToken; // Read the accessToken from cookies
  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN);
      req.user = decodedToken.userId;
      // console.log('User authenticated. Decoded token:', decodedToken);
    } catch (error) {
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        // Invalid token or expired token
        return res.status(401).json({ error: 'Invalid or expired token.' });
      } else {
        // Other unexpected errors
        return res.status(500).json({ error: 'Internal server error.' });
      }
    }
  }

  // Continue to the next middleware or route handler
  next();
};

// Import and use the routes
const userRoutes = require('./routes/userRoutes');
const topicRoutes = require('./routes/topicRoutes');
const ideaRoutes = require('./routes/ideaRoutes');
const listRoutes = require('./routes/listRoutes');

app.use('/api/users', authenticateUser, userRoutes);
app.use('/api/topic',  topicRoutes)
app.use('/api/idea', ideaRoutes)
app.use('/api/lists', authenticateUser, listRoutes);


app.listen(8080, ()=> console.log("server started!"))