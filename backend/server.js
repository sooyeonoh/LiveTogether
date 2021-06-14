require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')//.set('debug', true);
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const database = require('./database/db');
const User = require("./models/user-schema");

const PORT = process.env.PORT || 5000;

// ------------------------------------ MIDDLEWARE ------------------------------------

mongoose.connect(database.db, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
  console.log('Database connected sucessfully')
});
mongoose.set("useCreateIndex", true);

const app = express();

app.use(express.static("../frontend/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors(
    {
    origin: "http://localhost:3000",
    credentials: true
  }
  )
);
app.use(session({
  secret: "Thisisasecretstring.",
  resave: true,
  saveUninitialized: true
}))
app.use(cookieParser("Thisisasecretstring."));

app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

// ------------------------------------ ROUTES ------------------------------------

app.get("/dashboard/:id", (req, res) => {
  const userID = req.params.id;
  console.log('Searching for ID:', userID);
  User.findById(userID, function (err, user) {
      if (err) {
        console.log(err);
      } else if (!user) {
        console.log("User " + userID + " not found.");
      } else {
        res.send(user);
      }
    })
});

app.get("/auth/google", 
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/dashboard", 
  passport.authenticate("google", { failureRedirect: "/signup" }),
  (req, res) => {
    console.log("User authenticated from Google");
    res.redirect("/auth/google/dashboard/id/" + user._id);
});

app.get("/auth/google/dashboard/:id", (req, res) => {
    const userID = req.params.id;
    console.log('Searching for ID:', userID);
    User.findById(userID, function (err, user) {
      if (err) {
          console.log(err);
      } else if (!user) {
          console.log("User " + userID + " not found.");
      } else {
          console.log(user);
      }
    })
});

app.post("/signin", (req, res, next) => {
  // const user = new User({
  //   username: req.body.username,
  //   email: req.body.email,
  //   password: req.body.password
  // });

  passport.authenticate('local', function(err, user, info) {
    if (err) { 
      return next(err); 
    } else if (!user) { 
      return res.redirect("/signin"); 
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.send(user);
    });
  })(req, res, next);
  
  // req.login(user, function(err) {
  //   if (!err) {
  //     passport.authenticate("local")(req, res, function() {
  //       console.log("User authenticated from /signin");
  //       res.send(user);
  //     });
  //   } else {
  //     console.log(err);
  //   }
  // });
});

app.post("/signup", (req, res) => {
  const newUser = new User({ fName: req.body.fName, lName: req.body.lName, email: req.body.email, username: req.body.email, password: req.body.password });
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function() {
        console.log("User authenticated from /signup");
        res.send(user);
      })
    }
  })
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

module.exports = app;