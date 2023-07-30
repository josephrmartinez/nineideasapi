const asyncHandler = require('express-async-handler');
const User = require('../models/user');
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
};

module.exports = userController;




// RESPOND WITH USER DETAILS: res.status(201).json(user) how???
    // Implement logic to verify user credentials and log them in
    // Example: Check if the provided email and password match an existing user
    // Example: const user = await User.findOne({ email: req.body.email });
    // Example: if (!user || !user.comparePassword(req.body.password)) { /* Handle invalid login */ }
    // Respond with the logged-in user details
    // Example: res.json(user);