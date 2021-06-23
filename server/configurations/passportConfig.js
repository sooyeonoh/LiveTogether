const User = require("../models/user-schema");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = function(passport) {
    passport.use(User.createStrategy());
    
    passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/dashboard",
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile._id }, function (err, user) {
            return cb(err, user);
        });
    }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
            });
    });
}