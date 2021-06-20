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
const Task = require("./models/task-schema");

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
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
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
  console.log('Loading dashboard for ID:', userID);
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
          res.send(user);
      }
    })
});

app.post("/signin", (req, res, next) => {

  passport.authenticate('local', function(err, user, info) {
    if (err) { 
      return next(err); 
    } else if (!user) { 
      return res.send("Your email or password is incorrect."); 
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      else {
        req.session.user = req.user;
        return res.send(user);
      }
    });
  })(req, res, next);
});

app.get('/signout', (req, res) => {
  req.session = null;
  req.logout();
  res.send({ message: "Logging out" });
})

app.post("/signup", (req, res) => {
  const newUser = new User({ fName: req.body.fName, lName: req.body.lName, email: req.body.email, username: req.body.email, password: req.body.password, roommates:[], tasks: [] });
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function() {
        req.session.user = req.user;
        console.log("User authenticated from /signup");
        res.send(user);
      })
    }
  })
});

app.get("/getTasks", (req, res) => {
    User.findById(req.session.user._id, function (err, user) {
      console.log("Getting tasks for user")
      const foundTasks = []
      console.log(user.tasks);
      user.tasks.forEach(item => Task.findById(item, (err, foundItem) => {
        console.log(foundItem)
        foundTasks.push(foundItem);
      }))
      res.send(foundTasks);
    })
})

app.post("/addTask", (req, res) => {
  console.log("Adding task")
  const taskToAdd = {
    task: req.body.task,
    completed: req.body.completed,
    username: req.body.username
  }
  User.findById(req.session.user._id).then(
    user => {
      const newTask = new Task(taskToAdd);
      newTask.save();
      user.tasks.push(newTask);
      res.send(taskToAdd);
    }
  ) 
  // {$push: { "tasks": newTask }});
  // console.log(req.session.user.tasks);
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

module.exports = app;