const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const List = require('../models/list')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const userController = {
  registerUser: asyncHandler(async (req, res, next) => {
    const { username, password, email, bio } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        username: username,
        password: hashedPassword,
        email: email,
        bio: bio
      });
  
      await newUser.save();
  
      res.status(201).json(newUser);
    } catch (error) {
        console.log("Registration error:", error)
        res.status(400).json({error: error});
    }
  }),
  

    loginUser: asyncHandler(async (req, res, next) => {
      const { username, password } = req.body;
  
      // Validate user credentials
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ message: "Incorrect username or password" });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Incorrect username or password" });
      }
  
      // If the credentials are valid, create a JWT token
      const token = jwt.sign({ userId: user._id, username: user.username }, process.env.ACCESS_TOKEN);
  
      // Return the token to the client
      res.cookie('nineideasAccessToken', token, { httpOnly: false, sameSite: 'lax' });
      // console.log(res.getHeaders())
      res.json({ success: true, token: token });
    }),
      
  

  logoutUser: (req, res) => {
    // Implement logic to log the user out using req.logout()
    // THIS DOES NOTHING FOR JWT
    req.logout();
    
    // Respond with the user details after successful logout
    res.status(200).json({ message: "User logged out successfully", user: req.user });
  },



  getUserById: asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
        .populate({
          path: 'lists',
          populate: [
            { path: 'topic' },
            { path: 'comments', select: '_id' },
            { path: 'likes', select: '_id' }
          ],
          select: 'topic likes public completed'
        })
        .exec();
  
      if (!user) {
        // If user is not found, return a 404 Not Found response
        return res.status(404).json({ error: 'User not found' });
      }
  
      const isAuthenticatedUser = req.user === req.params.id

      // Filter lists based on visibility
      const filteredLists = user.lists.map(list => {
        if (isAuthenticatedUser || list.public) {
          return list;
        }
      });


      const { _id, username, email, createdAt, bio, currentStreak, completedLists, recordStreak } = user;

    // Create a response object with user data and the current streak
    const response = {
      _id,
      username,
      email,
      createdAt,
      bio,
      lists: filteredLists,
      currentStreak,
      completedLists, 
      recordStreak
    };
    
    
    res.json(response);
    } catch (error) {
      // If there's any error during the operation, return a 500 Internal Server Error response
      // console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }),

  patchUpdateUser: asyncHandler(async (req, res) => {
    try {
      // Find the USER by ID
      const user = await User.findById(req.params.id);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Apply partial updates from the request body to the list
      Object.assign(user, req.body);
  
      // Save the updated list
      const updatedUser = await user.save();
  
      // Respond with the updated list details
      res.json(updatedUser);
    } catch (error) {
      // console.error('Error updating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }),

  deleteUser: asyncHandler(async (req, res) => {
    // Implement logic to delete the user by ID
    await User.findByIdAndDelete(req.params.id);
    // Respond with a success message
    res.json({ message: 'User deleted successfully' });
  }),


};

module.exports = userController;




  // getListsByUserId: asyncHandler(async (req, res) => {
  //   try {
  //     // Add logic to determine current user and permissions... viewing own lists or public lists...
  //     const userid = req.params.userid; // Extract userid from URL params
  //     const userLists = await List.find({ author: userid, status: 'published', visibility: 'public' })
  //     .sort({ dateAdded: -1 }) // Sort by dateAdded in descending order
  //     .limit(20) // Limit the result to 20 documents
  //     .exec();
  //     // Respond with the lists data
  //     res.json(userLists);
  //   } catch (error) {
  //     res.status(500).json({error: "An error occured while fetching lists"})
  //   }
  // }),

  // getListsByCurrentUser: asyncHandler(async (req, res) => {
  //   try {
  //     // Check if the user is authenticated and available in req.user
  //     if (!req.user) {
  //       // If the user is not authenticated, respond with an error message
  //       return res.status(401).json({ error: 'Unauthorized' });
  //     }
  
  //     const currentUserID = req.user._id; // Get the current user's ID from req.user
  
  //     // Implement logic to fetch lists attributed to the currently signed-in user
  //     const userLists = await List.find({ author: currentUserID })
  //       .sort({ dateAdded: 1 }) // Sort by dateAdded in descending order
  //       .limit(20) // Limit the result to 20 documents
  //       .exec();
  
  //     // Respond with the lists data
  //     res.json(userLists);
  //   } catch (error) {
  //     // Handle any errors that occur during the database query or processing
  //     res.status(500).json({ error: 'An error occurred while fetching lists' });
  //   }
  // }),


  // DEPRECATED
  // updateUser: asyncHandler(async (req, res) => {
  //   // Implement logic to update the user details based on the request data
  //   const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  //   // Respond with the updated user details
  //   res.json(updatedUser);
  // }),
