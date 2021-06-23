require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
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
mongoose.set('useFindAndModify', false);

const app = express();

app.use(express.static("../frontend/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000",
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
  })
);

app.use(session({
  secret: "Thisisasecretstring.",
  resave: true,
  saveUninitialized: true
}))
app.use(cookieParser("Thisisasecretstring."));

app.use(passport.initialize());
app.use(passport.session());
require("./configurations/passportConfig")(passport);

// ------------------------------------ ROUTES ------------------------------------

require("./routes/authentication")(app);
require("./routes/tasks")(app);
require("./routes/roommates")(app);

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

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

module.exports = app;