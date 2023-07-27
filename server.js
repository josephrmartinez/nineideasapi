const express = require("express")
require('dotenv').config()
const app = express()
const mongoose = require('mongoose');
const session = require("express-session");
const cors = require('cors');
const User = require('/models/user')

// connect to MongoDB
mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGODB_URI
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.use(cors());
app.use(express.json())
// Configure express-session
app.use(session({ secret: "mango", resave: false, saveUninitialized: true }));

passport.use(
    // LocalStrategy is the common username-password strategy for auth
    new LocalStrategy(async(username, password, done) => {
      try {
        const user = await User.findOne({ username: username });
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        };
        bcrypt.compare(password, user.password, (err, res)=> {
            if (res){
                // passwords match, log user in
                return done(null, user)
            } else {
                // passwords to not match
                return done(null, false, {message: "Incorrect Password"})
            }
        })
      } catch(err) {
        return done(err);
      };
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(async function(id, done) {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch(err) {
      done(err);
    };
  });


app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// CHECK Middleware function to access currentUser variable in all views
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})

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