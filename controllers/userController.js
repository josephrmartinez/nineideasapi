const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const List = require('../models/list')
const passport = require("passport");
const bcrypt = require('bcryptjs');

const userController = {
  registerUser: asyncHandler(async (req, res) => {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
            return next(err);
        } else {
            const newUser = new User({
                username: req.body.username,
                password: hashedPassword,
                email: req.body.email,
                bio: req.body.bio
            });
            await newUser.save();
            res.status(201).json(newUser)
        }
      })
    }),
    loginUser: (req, res, next) => {
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(401).json({ message: "Incorrect username or password" });
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          return res.json(user); // or redirect to a success page if needed
        });
      })(req, res, next);
    },
      
  

  logoutUser: (req, res) => {
    // Implement logic to log the user out using req.logout()
    req.logout();
    
    // Respond with the user details after successful logout
    res.status(200).json({ message: "User logged out successfully", user: req.user });
  },


  getUserById: asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    res.json(user)
  }),

  updateUser: asyncHandler(async (req, res) => {
    // Implement logic to update the user details based on the request data
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    // Respond with the updated user details
    res.json(updatedUser);
  }),

  deleteUser: asyncHandler(async (req, res) => {
    // Implement logic to delete the user by ID
    await User.findByIdAndDelete(req.params.id);
    // Respond with a success message
    res.json({ message: 'User deleted successfully' });
  }),

  getListsByUserId: asyncHandler(async (req, res) => {
    try {
      const userid = req.params.userid; // Extract userid from URL params
      const userLists = await List.find({ author: userid, status: 'published', visibility: 'public' })
      .sort({ dateAdded: -1 }) // Sort by dateAdded in descending order
      .limit(20) // Limit the result to 20 documents
      .exec();
      // Respond with the lists data
      res.json(userLists);
    } catch (error) {
      res.status(500).json({error: "An error occured while fetching lists"})
    }
  }),

  getListsByCurrentUser: asyncHandler(async (req, res) => {
    try {
      // Check if the user is authenticated and available in req.user
      if (!req.user) {
        // If the user is not authenticated, respond with an error message
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      const currentUserID = req.user._id; // Get the current user's ID from req.user
  
      // Implement logic to fetch lists attributed to the currently signed-in user
      const userLists = await List.find({ author: currentUserID })
        .sort({ dateAdded: -1 }) // Sort by dateAdded in descending order
        .limit(20) // Limit the result to 20 documents
        .exec();
  
      // Respond with the lists data
      res.json(userLists);
    } catch (error) {
      // Handle any errors that occur during the database query or processing
      res.status(500).json({ error: 'An error occurred while fetching lists' });
    }
  }),

};

module.exports = userController;




// RESPOND WITH USER DETAILS: res.status(201).json(user) how???
    // Implement logic to verify user credentials and log them in
    // Example: Check if the provided email and password match an existing user
    // Example: const user = await User.findOne({ email: req.body.email });
    // Example: if (!user || !user.comparePassword(req.body.password)) { /* Handle invalid login */ }
    // Respond with the logged-in user details
    // Example: res.json(user);